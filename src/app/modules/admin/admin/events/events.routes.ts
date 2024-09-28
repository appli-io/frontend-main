import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { eventResolver } from './resolvers/events.resolver';
import { EventsService } from './events.service';

export default [
    {
        path         : '',
        loadComponent: () => import('./events.component').then(m => m.EventsComponent),
        children     : [
            {
                path         : '',
                resolve      : {
                    events: () => inject(EventsService).getEvents()
                },
                loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
            },
            {
                path         : 'edit/:id',
                resolve      : {
                    event: eventResolver
                },
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
            }
        ]
    }
] as Routes;
