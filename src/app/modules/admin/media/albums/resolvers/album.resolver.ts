import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { AlbumService }                                           from '@modules/admin/media/albums/album.service';
import { inject }                                                 from '@angular/core';

export const albumResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  albumService: AlbumService = inject(AlbumService)
) => {
  return albumService.getAlbum(route.params.id);
};
