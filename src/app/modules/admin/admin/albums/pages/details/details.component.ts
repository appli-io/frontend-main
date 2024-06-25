import { Component }                from '@angular/core';
import { AsyncPipe, DatePipe }      from '@angular/common';
import { MatButton, MatIconAnchor } from '@angular/material/button';
import { MatDialog }                from '@angular/material/dialog';
import { MatDivider }               from '@angular/material/divider';
import { MatIcon }                  from '@angular/material/icon';
import { MatTooltip }               from '@angular/material/tooltip';
import { RouterLink }               from '@angular/router';

import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { Observable, take }                  from 'rxjs';

import { FuseConfirmationService }  from '@fuse/services/confirmation';
import { AlbumsService }            from '@modules/admin/admin/albums/albums.service';
import { AlbumImageTableComponent } from '@modules/admin/admin/albums/components/album-image-table/album-image-table.component';
import { IAlbum }                   from '@modules/admin/apps/albums/interfaces/album.interface';
import { IAlbumImage }              from '@modules/admin/apps/albums/interfaces/album-image.interface';
import { UploadImagesComponent }    from '@modules/admin/admin/albums/components/upload-images/upload-images.component';
import { Notyf }                    from 'notyf';

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
    MatButton,
    MatIconAnchor,
    AlbumImageTableComponent,
    AsyncPipe
  ],
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  public album$: Observable<IAlbum>;
  notyf = new Notyf();

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _albumsService: AlbumsService,
    private readonly _matDialog: MatDialog
  ) {
    this.album$ = this._albumsService.album$;
  }

  public openUploadImageDialog() {
    this._matDialog.open(UploadImagesComponent, {
      panelClass: 'dialog-mobile-fullscreen',
      data      : {
        album: this.album$
      }
    });
  }

  public editAlbum(): void {

  }

  public deleteAlbum(): void {

  }

  public deleteImage(albumId: string, image: IAlbumImage): void {
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete Image',
      message: 'Are you sure you want to delete this image?',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._albumsService.deleteImage(albumId, image.id)
          .pipe(take(1))
          .subscribe({
            next : () => {
              this.notyf.success('Image deleted');
            },
            error: (error) => {
              console.error(error);
              this.notyf.error('Error deleting image');
            }
          });
      }
    });
  }

  public pageChange(event: any): void {

  }
}
