import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent }     from '@modules/admin/home/interface/event.interface';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { DateTime }                              from 'luxon';

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
        return this._http.get<IEvent[]>('api/event')
            .pipe(
                map(response => response.map(this._mapEvent)),
                tap(events => this._events.next(events))
            );
    }

    public getEvent(eventId: string): Observable<IEvent> {
        return this._http.get<IEvent>(`api/event/${ eventId }`);
    }

    public createEvent(event: IEvent) {
        return this._http.post<IEvent>('api/event', event)
            .pipe(
                map(this._mapEvent),
                tap(newEvent => this._events.next([ newEvent, ...this._events.value ]))
            );
    }

    public updateEvent(eventId: string, event: IEvent) {
        return this._http.patch<IEvent>(`api/event/${ eventId }`, event)
            .pipe(
                map(this._mapEvent),
                tap(updatedEvent => {
                    const events = this._events.value.map(e => e.id === eventId ? updatedEvent : e);
                    this._events.next(events);
                })
            );
    }


    public deleteEvent(eventId: string) {
        return this._http.delete<IEvent>(`api/event/${ eventId }`)
            .pipe(
                tap(() => {
                    const events = this._events.value.filter(event => event.id !== eventId);
                    this._events.next(events);
                })
            );
    }

    private _mapEvent(event: IEvent): IEvent {
        const startDate = DateTime.fromISO(event.startDate as string);
        const endDate = event.endDate ? DateTime.fromISO(event.endDate as string) : null;

        return {
            ...event,
            startDate,
            endDate
        };
    }
}
