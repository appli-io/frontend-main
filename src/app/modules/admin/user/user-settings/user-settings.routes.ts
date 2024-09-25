import { Routes }      from '@angular/router';
import { inject }      from '@angular/core';
import { UserService } from '@modules/admin/user/user.service';

export default [
  {
    path         : '',
    loadComponent: () => import('./user-settings.component').then(m => m.UserSettingsComponent),
    children     : [
      {
        path         : 'personal-information',
        resolve      : {
          user: () => inject(UserService).getCurrentUser()
        },
        loadComponent: () => import('./pages/personal-information/personal-information.component').then(m => m.PersonalInformationComponent),
      }
    ]
  }
] satisfies Routes;
