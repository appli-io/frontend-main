import { Routes }           from '@angular/router';
import { ProfileComponent } from '@modules/admin/user/profile/profile.component';
import { profileResolver }  from '@modules/admin/user/profile/resolver/profile.resolver';

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
