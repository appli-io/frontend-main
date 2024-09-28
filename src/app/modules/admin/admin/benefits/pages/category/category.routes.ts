import { Routes }                 from '@angular/router';
import { inject }                 from '@angular/core';
import { BenefitCategoryService } from '@modules/admin/admin/benefits/services/benefit-category.service';

export default [
    {
        path         : '',
        resolve      : {
            benefits: () => inject(BenefitCategoryService).findAll()
        },
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent)
    },
    {
        path         : 'create',
        loadComponent: () => import('./create/create.component').then(m => m.CreateComponent)
    },
] satisfies Routes;
