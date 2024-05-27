import { Routes } from '@angular/router';

export default [
  {
    path         : '',
    loadComponent: () => import('./albums.component').then(m => m.AlbumsComponent),
  }
] as Routes;
