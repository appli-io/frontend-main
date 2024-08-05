import { Routes } from '@angular/router';

export default [
  {
    path         : '',
    loadComponent: () => import('./benefits.component').then(m => m.BenefitsComponent),
    children     : [
      {path: '', loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)},
      {path          : 'id/:id',
        loadComponent: () => import('./pages/category-detail/category-detail.component').then(m => m.CategoryDetailComponent)
      }
    ]
  }
] as Routes;
