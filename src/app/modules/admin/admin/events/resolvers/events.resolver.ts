import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { EventsService } from '../events.service';

export const eventResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  eventsService: EventsService = inject(EventsService)
) => {
  return eventsService.getEvent(route.params.id);
};
