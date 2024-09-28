import { Routes }                from '@angular/router';
import { inject }                from '@angular/core';
import { BenefitCompanyService } from '@modules/admin/admin/benefits/services/benefit-company.service';

export default [
    {
        path         : '',
        resolve      : {
            benefits: () => inject(BenefitCompanyService).findAll()
        },
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent)
    },
    {
        path         : 'create',
        loadComponent: () => import('./create/create.component').then(m => m.CreateComponent)
    },
] satisfies Routes;
