import { inject }    from '@angular/core';
import { ResolveFn } from '@angular/router';

import { switchMap } from 'rxjs';

import { UserService }    from '@core/user/user.service';
import { ProfileService } from '@modules/admin/user/profile/profile.service';

export const profileResolver: ResolveFn<any> = (route, state) => {
  const _userService = inject(UserService);
  const _profileService = inject(ProfileService);
  const userId: string | undefined = route.params?.id;

  if (userId) {
    return _profileService.getProfile(userId);
  } else {
    return _userService.user$.pipe(
      switchMap(user => _profileService.getProfile(user.id))
    );
  }
};

