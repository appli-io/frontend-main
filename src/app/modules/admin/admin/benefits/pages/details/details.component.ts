import { Component }                from '@angular/core';
import { AsyncPipe, DatePipe }      from '@angular/common';
import { MatButton, MatIconAnchor } from '@angular/material/button';
import { MatDialog }                from '@angular/material/dialog';
import { MatDivider }               from '@angular/material/divider';
import { MatIcon }                  from '@angular/material/icon';
import { MatTooltip }               from '@angular/material/tooltip';
import { Router, RouterLink }       from '@angular/router';

import { TranslocoDirective, TranslocoPipe }                                            from '@ngneat/transloco';
import { Notyf }                                                                        from 'notyf';
import { combineLatest, firstValueFrom, lastValueFrom, mergeMap, Observable, of, take } from 'rxjs';

import { FuseConfirmationService }  from '@fuse/services/confirmation';
import { UploadImagesComponent }    from '@modules/admin/admin/albums/dialogs/upload-images/upload-images.component';
import { AlbumImageTableComponent } from '@modules/admin/admin/albums/components/album-image-table/album-image-table.component';
import { IAlbum }                   from '@modules/admin/apps/albums/interfaces/album.interface';
import { IAlbumImage }              from '@modules/admin/apps/albums/interfaces/album-image.interface';
import { NewOrEditComponent }       from '@modules/admin/admin/albums/dialogs/new-or-edit/new-or-edit.component';
import { BenefitsService }          from '@modules/admin/admin/benefits/services/benefits.service';

@Component({
  selector   : 'app-details',
  standalone : true,
  imports    : [
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
  public benefit$: Observable<IAlbum>;
  private _notyf = new Notyf();

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _benefitsService: BenefitsService,
    private readonly _matDialog: MatDialog,
    private readonly _router: Router
  ) {
    this.benefit$ = this._benefitsService.benefit$;
  }

  public openUploadImageDialog() {
    this._matDialog.open(UploadImagesComponent, {
      panelClass: 'dialog-mobile-fullscreen',
      data      : {
        benefit: this.benefit$
      }
    });
  }

  public async editAlbum() {
    const benefit = await firstValueFrom(this.benefit$);

    this._matDialog.open(NewOrEditComponent, {
      panelClass: 'dialog-mobile-fullscreen',
      data      : {benefit}
    });
  }

  public async deleteAlbum() {
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete album',
      message:
        'Are you sure you want to delete the benefit? This action cannot be undone.',
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    // Subscribe to the confirmation dialog closed action

    confirmation.afterClosed()
      .pipe(
        mergeMap((result) => combineLatest([ of(result), this.benefit$ ])),
        mergeMap(async ([ result, album ]) => {
          if (result === 'confirmed') {
            await lastValueFrom(this._benefitsService.delete(album.id));
            return {removed: true};
          }
          return {removed: false};
        }),
        take(1)
      ).subscribe({
      next : (response) => {
        console.log(response);
        if (response.removed) {
          this._notyf.success('Album deleted');
          this._router.navigate([ '/admin/albums' ]);
        }
      },
      error: (error) => {
        console.error(error);
        this._notyf.error('Error deleting album');
      }
    });
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
        this._benefitsService.deleteImage(albumId, image.id)
          .pipe(take(1))
          .subscribe({
            next : () => {
              this._notyf.success('Image deleted');
            },
            error: (error) => {
              console.error(error);
              this._notyf.error('Error deleting image');
            }
          });
      }
    });
  }

  public pageChange(event: any): void {

  }
}
