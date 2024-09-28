import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject }                                                 from '@angular/core';

import { AlbumsService } from '../albums.service';

export const albumResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    albumService: AlbumsService = inject(AlbumsService)
) => {
    return albumService.getAlbum(route.params.id);
};
