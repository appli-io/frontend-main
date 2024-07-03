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

  public getEvent(eventId: string): Observable<IEvent> {
    return this._http.get<Api<IEvent>>(`api/event/${eventId}`)
      .pipe(map(response => response.content));
  }

  public createEvent(event: IEvent) {
    return this._http.post<Api<IEvent>>('api/event', event)
      .pipe(map(response => response.content),
      tap(newEvent => this._events.next([newEvent, ...this._events.value]))
    );
  }

  public updateEvent( event: IEvent) {
    return this._http.put<Api<IEvent>>(`api/event/${event.id}`, event)
      .pipe
      (map(response => response.content),
      tap(updatedEvent => {
        this._events.next(this._events.value
          .map(event => event.id === updatedEvent.id ? updatedEvent : event));
      }
    ))
  }
  

  public deleteEvent(eventId: string) {
    return this._http.delete<Api<IEvent>>(`api/event/${eventId}`)
      .pipe(map(response => response.content),
      tap(() => {
        const events = this._events.value.filter(event => event.id !== eventId);
        this._events.next(events);
      })
    );
  }
  
}
