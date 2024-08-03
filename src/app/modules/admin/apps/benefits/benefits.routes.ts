import { Routes } from '@angular/router';

export default [
  {
    path         : '',
    loadComponent: () => import('./benefits.component').then(m => m.BenefitsComponent),
    children     : [
      {path: '', loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)},
    ]
  }
] as Routes;
