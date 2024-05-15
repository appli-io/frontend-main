import { AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { CalendarCommonModule, CalendarEvent, CalendarMonthModule }       from 'angular-calendar';
import { DatePipe, NgIf }                                                 from '@angular/common';
import { TranslocoDirective }                                             from '@ngneat/transloco';
import VanillaCalendar                                                    from 'vanilla-calendar-pro';
import { FormatDateString, IOptions, IVanillaCalendar }                   from 'vanilla-calendar-pro/types';

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
  viewDate: Date = new Date();
  selectedDate: Date = new Date();
  consoles = console;
  events: CalendarEvent[] = [
    {
      id    : 1,
      start : new Date(),
      allDay: true,
      title : 'An event',
      color : {
        primary  : '#8BC34A',
        secondary: '#8BC34A'
      },

    }
  ];

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef
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

  clickDay(e: MouseEvent, self: VanillaCalendar): void {
    console.log(self.selectedDates);
    if (self.selectedDates.length === 0) {
      this.selectedDate = new Date();
      return;
    }
    this.selectedDate = new Date(self.selectedDates[0]);
  }

  getDays(day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) {
    HTMLButtonElement.style.flexDirection = 'column';
    HTMLButtonElement.innerHTML = `
        <span>${ day }</span>
        <span style="font-size: 8px;color: #8BC34A;">X events</span>
      `;
  }

  debugge(data: any) {
    console.log(data);
  }
}
