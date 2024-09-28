import { Routes } from '@angular/router';

export default [
    {
        path        : 'settings',
        loadChildren: () => import('./user-settings/user-settings.routes')
    },
    {
        path         : 'me',
        loadComponent: () => import('./profile/profile.component').then(component => component.ProfileComponent)
    }
] satisfies Routes;
