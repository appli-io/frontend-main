import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api } from '@core/interfaces/api';
import { IEvent } from '@modules/admin/home/interface/event.interface';

import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _events: BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>(null);
  private _event: BehaviorSubject<IEvent> = new BehaviorSubject<IEvent>(null);

  constructor(private _http: HttpClient) { }

  get events$(): Observable<IEvent[]> {
    return this._events.asObservable();
  }

  public getEvents() {
    return this._http.get<Api<IEvent[]>>('api/event')
      .pipe(map(response => response.content),
      tap(events => this._events.next(events))
    );
  }

  public createEvent(event: IEvent) {
    return this._http.post<Api<IEvent>>('api/event', event)
      .pipe(map(response => response.content),
      tap(newEvent => this._events.next([newEvent, ...this._events.value]))
    );
  }

 

}
