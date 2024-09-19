import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { BenefitCategoryService }         from '@modules/admin/admin/benefits/services/benefit-category.service';
import { inject }                         from '@angular/core';
import { LayoutEnum }                     from '@core/enums/layout.enum';

export default [
  {
    path         : '',
    loadComponent: () => import('./benefits.component').then(m => m.BenefitsComponent),
    resolve      : {
      categories: () => inject(BenefitCategoryService).findAll(LayoutEnum.FULL)
    },
    children     : [
      {
        path         : '',
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
      },
      {
        path   : 'category/:id',
        resolve: {
          category: (route: ActivatedRouteSnapshot) => inject(BenefitCategoryService).findOne(route.queryParams.category ? route.queryParams.category : route.params.id),
          benefits: (route: ActivatedRouteSnapshot) => inject(BenefitCategoryService).findOneBenefits(route.queryParams.category ? route.queryParams.category : route.params.id)
        },
        loadComponent: () => import('./pages/category-detail/category-detail.component').then(m => m.CategoryDetailComponent)
      }
    ]
  }
] as Routes;
