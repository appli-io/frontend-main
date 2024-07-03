import { Routes }       from '@angular/router';
import { inject }       from '@angular/core';
import { UsersService } from '@modules/admin/admin/users/users.service';

export default [
  {
    path         : '',
    resolve      : {
      data: () => inject(UsersService).getMembers({}),
    },
    loadComponent: () => import('./users.component').then(m => m.UsersComponent),
  }
] as Routes;
