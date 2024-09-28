import { Routes } from '@angular/router';

export default [
    {
        path         : '',
        loadComponent: () => import('./external-biobio.component').then(m => m.ExternalBiobioComponent)
    }
] as Routes;
