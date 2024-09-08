import { Routes }                 from '@angular/router';
import { BenefitCategoryService } from '@modules/admin/admin/benefits/services/benefit-category.service';
import { inject }                 from '@angular/core';

export default [
  {
    path         : '',
    loadComponent: () => import('./benefits.component').then(m => m.BenefitsComponent),
    children     : [
      {
        path         : '',
        resolve      : {
          categories: () => inject(BenefitCategoryService).findAll()
        },
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
      },
      {
        path: 'id/:id',
        loadComponent: () => import('./pages/category-detail/category-detail.component').then(m => m.CategoryDetailComponent)
      }
    ]
  }
] as Routes;
