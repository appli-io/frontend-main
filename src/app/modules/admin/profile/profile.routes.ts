import { Routes }           from '@angular/router';
import { ProfileComponent } from '@modules/admin/profile/profile.component';
import { profileResolver }  from '@modules/admin/profile/resolver/profile.resolver';

export default [
  {
    path: '',
    component: ProfileComponent,
    resolve: {resolvedUser: profileResolver}
  },
  {
    path: ':id',
    component: ProfileComponent,
    resolve: {resolvedUser: profileResolver}
  }
] as Routes;
