import { AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { CalendarCommonModule, CalendarEvent, CalendarMonthModule }       from 'angular-calendar';
import { DatePipe, NgIf }                                                 from '@angular/common';
import { TranslocoDirective }                                             from '@ngneat/transloco';
import VanillaCalendar                                                    from 'vanilla-calendar-pro';
import { FormatDateString, IOptions, IVanillaCalendar }                   from 'vanilla-calendar-pro/types';
import { MatDialog }                                                      from '@angular/material/dialog';
import { EventModalComponent }                                            from '@modules/admin/home/entry-components/event-modal/event-modal.component';

@Component({
  selector     : 'home-calendar',
  standalone   : true,
  imports      : [
    CalendarMonthModule,
    CalendarCommonModule,
    NgIf,
    TranslocoDirective,
    DatePipe
  ],
  templateUrl  : './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [ './calendar.component.scss' ]
})
export class CalendarComponent implements AfterViewInit {
  selectedDate: Date = new Date();
  twoDaysMore = new Date(new Date().setDate(new Date().getDate() + 2));
  events: CalendarEvent[] = [
    {
      id    : 1,
      start : new Date(new Date().setDate(new Date().getDate() + 2)),
      allDay: true,
      title : 'Event 1',
      color : {primary: '#8BC34A', secondary: '#8BC34A'},
    },
    {
      id    : 2,
      start : new Date(new Date().setDate(new Date().getDate() + 3)),
      allDay: true,
      title : 'Event 2',
      color : {primary: '#FF5722', secondary: '#FF5722'},
    },
    {
      id    : 3,
      start : new Date(new Date().setDate(new Date().getDate() + 4)),
      allDay: true,
      title : 'Event 3',
      color : {primary: '#2196F3', secondary: '#2196F3'},
    },
    {
      id    : 4,
      start : new Date(new Date().setDate(new Date().getDate() + 5)),
      allDay: true,
      title : 'Event 4',
      color : {primary: '#FFC107', secondary: '#FFC107'},
    },
    {
      id   : 5,
      start: new Date(new Date().setDate(new Date().getDate() + 6)),
      allDay: true,
      title: 'Event 5',
      color: {primary: '#9C27B0', secondary: '#9C27B0'},
    },
    {
      id    : 6,
      start : new Date(new Date().setDate(new Date().getDate() + 7)),
      allDay: true,
      title : 'Event 6',
      color : {primary: '#009688', secondary: '#009688'},
    },
    {
      id    : 7,
      start : new Date(new Date().setDate(new Date().getDate() + 8)),
      allDay: true,
      title : 'Event 7',
      color : {primary: '#3F51B5', secondary: '#3F51B5'},
    },
    {
      id    : 8,
      start : new Date(new Date().setDate(new Date().getDate() + 9)),
      allDay: true,
      title : 'Event 8',
      color : {primary: '#E91E63', secondary: '#E91E63'},
    },
    {
      id    : 9,
      start : new Date(new Date().setDate(new Date().getDate() + 10)),
      allDay: true,
      title : 'Event 9',
      color : {primary: '#CDDC39', secondary: '#CDDC39'},
    },
    {
      id    : 10,
      start : new Date(new Date().setDate(new Date().getDate() + 11)),
      allDay: true,
      title : 'Event 10',
      color : {primary: '#FF9800', secondary: '#FF9800'},
    },
    {
      id    : 11,
      start : new Date(new Date().setDate(new Date().getDate() + 12)),
      allDay: true,
      title : 'Event 11',
      color : {primary: '#795548', secondary: '#795548'},
    },
    {
      id    : 12,
      start : new Date(new Date().setDate(new Date().getDate() + 13)),
      allDay: true,
      title : 'Event 12',
      color : {primary: '#607D8B', secondary: '#607D8B'},
    },
    {
      id    : 13,
      start : new Date(new Date().setDate(new Date().getDate() + 14)),
      allDay: true,
      title : 'Event 13',
      color : {primary: '#673AB7', secondary: '#673AB7'},
    },
    {
      id    : 14,
      start : new Date(new Date().setDate(new Date().getDate() + 15)),
      allDay: true,
      title : 'Event 14',
      color : {primary: '#00BCD4', secondary: '#00BCD4'},
    },
    {
      id    : 15,
      start : new Date(new Date().setDate(new Date().getDate() + 16)),
      allDay: true,
      title : 'Event 15',
      color : {primary: '#8BC34A', secondary: '#8BC34A'},
    },
    {
      id    : 16,
      start : new Date(new Date().setDate(new Date().getDate() + 17)),
      allDay: true,
      title : 'Event 16',
      color : {primary: '#FF5722', secondary: '#FF5722'},
    },
    {
      id    : 17,
      start : new Date(new Date().setDate(new Date().getDate() + 18)),
      allDay: true,
      title : 'Event 17',
      color : {primary: '#2196F3', secondary: '#2196F3'},
    },
    {
      id    : 18,
      start : new Date(new Date().setDate(new Date().getDate() + 19)),
      allDay: true,
      title : 'Event 18',
      color : {primary: '#FFC107', secondary: '#FFC107'},
    },
    {
      id    : 19,
      start : new Date(new Date().setDate(new Date().getDate() + 20)),
      allDay: true,
      title : 'Event 19',
      color : {primary: '#9C27B0', secondary: '#9C27B0'},
    },
    {
      id    : 20,
      start : new Date(new Date().setDate(new Date().getDate() + 21)),
      allDay: true,
      title : 'Event 20',
      color : {primary: '#009688', secondary: '#009688'},
    },
    // Eventos repetidos
    {
      id    : 21,
      start : new Date(new Date().setDate(new Date().getDate() + 2)),
      allDay: true,
      title : 'Event 1 (repeat)',
      color : {primary: '#8BC34A', secondary: '#8BC34A'},
    },
    {
      id    : 21.1,
      start : new Date(new Date().setDate(new Date().getDate() + 2)),
      allDay: true,
      title : 'Event 1 (repeat)',
      color : {primary: '#FF5722', secondary: '#8BC34A'},
    },
    {
      id    : 21.2,
      start : new Date(new Date().setDate(new Date().getDate() + 2)),
      allDay: true,
      title : 'Event 1 (repeat)',
      color : {primary: '#FF5722', secondary: '#8BC34A'},
    },
    {
      id    : 21.3,
      start : new Date(new Date().setDate(new Date().getDate() + 2)),
      allDay: true,
      title : 'Event 1 (repeat)',
      color : {primary: '#009688', secondary: '#8BC34A'},
    },
    {
      id    : 22,
      start : new Date(new Date().setDate(new Date().getDate() + 3)),
      allDay: true,
      title : 'Event 2 (repeat)',
      color : {primary: '#FF5722', secondary: '#FF5722'},
    }
  ];
  filteredEvents: CalendarEvent[] = [];

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    const calendar = new VanillaCalendar('#activity-calendar', {
      CSSClasses: {
        calendar: 'vanilla-calendar',
        day     : 'vanilla-calendar__day',
      },
      events    : this.events,
      actions   : {
        clickDay: (e: MouseEvent, self: VanillaCalendar) => this.clickDay(e, self),
        getDays : (day, date, HTMLElement, HTMLButtonElement, self) =>
          this.getDays(day, date, HTMLElement, HTMLButtonElement, self)
      },
      date      : {
        today: new Date()
      }
    } as IOptions);
    calendar.init();
  }

  openEventDetail(event: CalendarEvent): void {
    console.log(event);
    this._matDialog.open(EventModalComponent, {
      autoFocus: false,
      data     : {event}
    });
  }

  clickDay(e: MouseEvent, self: VanillaCalendar): void {
    this.filteredEvents = [];

    if (self.selectedDates.length === 0) {
      this.selectedDate = new Date();
      return;
    }

    const selectedDateString = self.selectedDates[0];
    const [ year, month, day ] = selectedDateString.split('-').map(Number);

    this.selectedDate = new Date(year, month - 1, day);

    this.filteredEvents = this.events.filter((event) => {
      const eventDate = event.start.toISOString().split('T')[0];
      return eventDate === selectedDateString;
    });
  }

  getDays(day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) {
    HTMLButtonElement.style.flexDirection = 'column';
    HTMLButtonElement.innerHTML = `<span>${ day }</span>`;

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
