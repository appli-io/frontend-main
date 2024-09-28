import { Routes }          from '@angular/router';
import { inject }          from '@angular/core';
import { BenefitsService } from './services/benefits.service';

export default [
    {
        path         : '',
        loadComponent: () => import('./benefits.component').then(m => m.BenefitsComponent),
        children     : [
            {
                path         : '',
                resolve      : {
                    benefits: () => inject(BenefitsService).findAll()
                },
                loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
            },
            {
                path         : 'create',
                loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent)
            },
            {
                path        : 'company',
                loadChildren: () => import('./pages/company/company.routes').then(m => m.default)
            },
            {
                path        : 'category',
                loadChildren: () => import('./pages/category/category.routes').then(m => m.default)
            }
        ]
    }
] as Routes;
