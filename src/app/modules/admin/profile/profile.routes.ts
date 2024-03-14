import { Routes }           from '@angular/router';
import { ProfileComponent } from '@modules/admin/profile/profile.component';
import { userResolver }     from '@modules/admin/profile/resolver/user.resolver';

export default [
  {
    path: '',
    component: ProfileComponent,
    resolve: {resolvedUser: userResolver}
  },
  {
    path: ':id',
    component: ProfileComponent,
    resolve: {resolvedUser: userResolver}
  }
] as Routes;
