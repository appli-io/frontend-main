import { Component }                         from '@angular/core';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { FuseConfirmationService }           from '@fuse/services/confirmation';
import { AlbumsService }                     from '@modules/admin/admin/albums/albums.service';
import { MatDialog }                         from '@angular/material/dialog';
import { DatePipe }                          from '@angular/common';
import { RouterLink }                        from '@angular/router';
import { MatIcon }                           from '@angular/material/icon';
import { IAlbum }                            from '@modules/admin/apps/albums/interfaces/album.interface';
import { takeUntilDestroyed }                from '@angular/core/rxjs-interop';
import { MatDivider }                        from '@angular/material/divider';
import { MatTooltip }                        from '@angular/material/tooltip';
import { MatButton }                         from '@angular/material/button';

@Component({
  selector   : 'app-details',
  standalone : true,
  imports: [
    TranslocoDirective,
    RouterLink,
    MatIcon,
    TranslocoPipe,
    MatDivider,
    DatePipe,
    MatTooltip,
    MatButton
  ],
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  public album: IAlbum;

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _albumsService: AlbumsService,
    private readonly _matDialog: MatDialog
  ) {
    this._albumsService.album$.pipe(takeUntilDestroyed()).subscribe(album => this.album = album);
  }
}
