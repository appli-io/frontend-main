import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { BenefitCategoryService }         from '@modules/admin/admin/benefits/services/benefit-category.service';
import { inject }                         from '@angular/core';
import { LayoutEnum }                     from '@core/enums/layout.enum';
import { BenefitsService }                from '@modules/admin/admin/benefits/services/benefits.service';

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
        path         : 'id/:benefitId',
        resolve      : {
          benefit: (route: ActivatedRouteSnapshot) => inject(BenefitsService).findOne(route.params.benefitId)
        },
        loadComponent: () => import('./pages/benefit-detail/benefit-detail.component').then(m => m.BenefitDetailComponent)
      },
      {
        path   : 'category/:categoryId',
        resolve: {
          category: (route: ActivatedRouteSnapshot) => inject(BenefitCategoryService).findOne(route.queryParams.category ? route.queryParams.category : route.params.categoryId),
          benefits: (route: ActivatedRouteSnapshot) => inject(BenefitCategoryService).findOneBenefits(route.queryParams.category ? route.queryParams.category : route.params.categoryId)
        },
        loadComponent: () => import('./pages/category-detail/category-detail.component').then(m => m.CategoryDetailComponent)
      }
    ]
  }
] as Routes;
