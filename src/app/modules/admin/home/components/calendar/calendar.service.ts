import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api }        from '@core/interfaces/api';
import { IEvent }     from '@modules/admin/home/interface/event.interface';
import { map }        from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private _http: HttpClient) { }

  getEvents() {
    return this._http.get<Api<IEvent[]>>('api/event')
      .pipe(map(response => response.content));
  }
}
