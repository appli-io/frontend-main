import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarCommonModule, CalendarEvent, CalendarMonthModule } from 'angular-calendar';
import { DatePipe, NgIf } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';
import VanillaCalendar from 'vanilla-calendar-pro';
import { FormatDateString, IOptions, IVanillaCalendar } from 'vanilla-calendar-pro/types';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '@modules/admin/home/entry-components/event-modal/event-modal.component';
import { EventCardComponent } from '@modules/admin/home/components/event-card/event-card.component';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'home-calendar',
  standalone: true,
  imports: [CalendarMonthModule, CalendarCommonModule, NgIf, TranslocoDirective, DatePipe, EventCardComponent],
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit {
  selectedDate: Date = new Date();
  twoDaysMore = new Date(new Date().setDate(new Date().getDate() + 2));
  events: CalendarEvent[];
  filteredEvents: CalendarEvent[] = [];

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _calendarService: CalendarService
  ) {
    this._calendarService.getEvents().subscribe((events) => {
      this.events = events.map((event) => {
        return {
          ...event,
          id: event.id,
          start: new Date(event.startDate),
          allDay: event.isAllDay,
          title: event.title,
          color: {
            primary: '#FFA500',
            secondary: '#FFD700',
          },
        } as CalendarEvent;
      });

      const calendar = new VanillaCalendar('#activity-calendar', {
        CSSClasses: {
          calendar: 'vanilla-calendar',
          day: 'vanilla-calendar__day',
        },
        events: this.events,
        actions: {
          clickDay: (e: MouseEvent, self: VanillaCalendar) => this.clickDay(e, self),
          getDays: (day, date, HTMLElement, HTMLButtonElement, self) => this.getDays(day, date, HTMLElement, HTMLButtonElement, self),
        },
        date: {
          today: new Date(),
        },
      } as IOptions);
      calendar.init();

      this._changeDetectorRef.detectChanges();
    });
  }

  ngAfterViewInit(): void {

  }

  openEventDetail(event: CalendarEvent): void {
    this._matDialog.open(EventModalComponent, {
      autoFocus: false,
      panelClass: ['dialog-mobile-fullscreen'],
      closeOnNavigation: true,
      data: { event },
    });
  }

  clickDay(e: MouseEvent, self: VanillaCalendar): void {
    this.filteredEvents = [];
    if (self.selectedDates.length === 0) {
      this.selectedDate = new Date();
      return;
    }

    const selectedDateString = self.selectedDates[0];
    const [year, month, day] = selectedDateString.split('-').map(Number);

    this.selectedDate = new Date(year, month - 1, day);

    this.filteredEvents = this.events.filter((event) => {
      const eventDate = event.start.toISOString().split('T')[0];
      return eventDate === selectedDateString;
    });
  }

  getDays(day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) {
    HTMLButtonElement.style.flexDirection = 'column';
    HTMLButtonElement.innerHTML = `<span>${day}</span>`;

    const eventsForDay = this.events.filter((event) => {
      const eventDate = event.start.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD
      return eventDate === date;
    });

    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('flex', 'flex-row', 'justify-center', 'items-center', 'gap-x-1');

    const addedColors = new Set<string>();

    eventsForDay.forEach((e) => {
      if (!addedColors.has(e.color.primary)) {
        addedColors.add(e.color.primary);

        const event = document.createElement('div');
        event.classList.add('event');
        event.style.backgroundColor = e.color.primary;
        event.style.width = '5px';
        event.style.height = '5px';
        event.style.borderRadius = '50%';
        event.style.marginTop = '4px';
        dotsContainer.appendChild(event);
      }
    });

    HTMLButtonElement.appendChild(dotsContainer);
  }
}
