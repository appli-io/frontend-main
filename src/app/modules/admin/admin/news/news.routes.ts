import { Routes } from '@angular/router';

export default [
  {
    path         : '',
    loadComponent: () => import('./news.component').then(m => m.NewsComponent)
  }
] as Routes;
