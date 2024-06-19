import { Routes } from '@angular/router';

export default [
  {
    path         : '',
    loadComponent: () => import('./events.component').then(m => m.EventsComponent),
    children     : [
      {
        path         : '',
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
      },
      {
        path: ':id',
        // resolve: {},
        loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
      }
    ]
  }
] as Routes;
