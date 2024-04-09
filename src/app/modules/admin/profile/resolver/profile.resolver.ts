import { inject }    from '@angular/core';
import { ResolveFn } from '@angular/router';

import { map, switchMap } from 'rxjs';

import { UserService }    from '@core/user/user.service';
import { IUser }          from '@modules/admin/profile/interfaces/user.interface';
import { ProfileService } from '@modules/admin/profile/profile.service';

export const profileResolver: ResolveFn<any> = (route, state) => {
  const _userService = inject(UserService);
  const _profileService = inject(ProfileService);
  const userId: number | undefined = route.params?.id;

  if (userId) {
    return _profileService.getProfile(userId).pipe(
      map(profile => profile.content as IUser)
    );
  } else {
    return _userService.user$.pipe(
      switchMap(user => _profileService.getProfile(user.id)),
      map(profile => profile.content as IUser)
    );
  }
};

