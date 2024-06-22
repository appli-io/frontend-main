import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { AlbumsService } from './albums.service';

export default [
  {
    path         : '',
    loadComponent: () => import('./albums.component').then(m => m.AlbumsComponent),
    children     : [
      {
        path         : '',
        resolve      : {
          albums: () => inject(AlbumsService).getAlbums()
        },
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
      }
      // {
      //   path: ':id',
      //   // resolve: {},
      //   loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
      // }
    ]
  }
] as Routes;
