import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalendarEvent }                             from 'angular-calendar';
import { DatePipe, NgIf }                            from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports        : [
    DatePipe,
    NgIf
  ],
  selector       : 'event-card',
  standalone     : true,
  styleUrls      : [ './event-card.component.scss' ],
  templateUrl    : './event-card.component.html'
})
export class EventCardComponent {
  @Input() event: CalendarEvent;
  @Input() first: boolean = false;
  @Input() last: boolean = false;

  get duration(): string {
    // Calculate end date - start date and return the duration in hours. (start and end are DateTime luxon object)
    console.log(this.event.start);
    console.log(this.event.end);

    const diff = this.event.meta.end.diff(this.event.meta.start, [ 'hours', 'minutes' ]);

    console.log(diff);

    return `${ diff.hours > 0 ? `${ diff.hours }h ` : '' }${ diff.minutes > 0 ? `${ diff.minutes }m` : '' }`;
  }
}
