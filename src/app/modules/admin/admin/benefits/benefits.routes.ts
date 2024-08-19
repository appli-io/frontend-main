import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { benefitResolver } from './resolvers/benefit.resolver';
import { BenefitsService } from './benefits.service';

export default [
  {
    path         : '',
    loadComponent: () => import('./benefits.component').then(m => m.BenefitsComponent),
    children     : [
      {
        path         : '',
        resolve      : {
          benefits: () => inject(BenefitsService).getAll()
        },
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
      },
      {
        path         : 'edit/:id',
        resolve      : {
          album: benefitResolver
        },
        loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
      }
      // {
      //   path: ':id',
      //   // resolve: {},
      //   loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
      // }
    ]
  }
] as Routes;
