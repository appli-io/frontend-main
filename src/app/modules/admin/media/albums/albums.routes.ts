import { Routes } from '@angular/router';

export default [
  {
    path         : '',
    loadComponent: () => import('./albums.component').then(m => m.AlbumsComponent),
    children: [
      {
        path         : '',
        loadComponent: () => import('./pages/albums-list/albums-list.component').then(m => m.AlbumsListComponent)
      }
    ]
  }
] as Routes;
