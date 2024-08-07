import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api }        from '@core/interfaces/api';
import { IEvent }     from '@modules/admin/home/interface/event.interface';
import { map }        from 'rxjs';
import { DateTime }   from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private _http: HttpClient) { }

  getEvents() {
    return this._http.get<Api<IEvent[]>>('api/event')
      .pipe(map(response => {
        return response.content.map(event => {
          const start = DateTime.fromISO(event.startDate as string);
          const end = event.endDate ? DateTime.fromISO(event.endDate as string) : null;

          console.log('start', start.toISO());

          return {
            ...event,
            start: start,
            end  : end,
          };
        });
      }));
  }
}
