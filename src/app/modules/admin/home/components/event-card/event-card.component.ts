import { Component, Input } from '@angular/core';
import { CalendarEvent }    from 'angular-calendar';
import { DatePipe, NgIf }   from '@angular/common';

@Component({
  selector: 'event-card',
  standalone : true,
  imports : [
    DatePipe,
    NgIf
  ],
  templateUrl: './event-card.component.html',
  styleUrls  : [ './event-card.component.scss' ]
})
export class EventCardComponent {
  @Input() event: CalendarEvent;
  @Input() first: boolean = false;
  @Input() last: boolean = false;

  get duration(): string {
    if (this.event.end) {
      const duration = (this.event.end.getTime() - this.event.start.getTime()) / 60000; // in minutes
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${ hours }h${ minutes }min`;
    }
    return '';
  }
}
