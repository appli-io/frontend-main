import { Component }                           from '@angular/core';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatDialog }                           from '@angular/material/dialog';
import { MatIcon }                             from '@angular/material/icon';
import { MatTooltip }                          from '@angular/material/tooltip';
import { RouterLink }                          from '@angular/router';

import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';

import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PageHeaderComponent }     from '@layout/components/page-header/page-header.component';
import { NewOrEditComponent }      from '@modules/admin/admin/albums/dialogs/new-or-edit/new-or-edit.component';
import { IAlbum }                  from '@modules/admin/apps/albums/interfaces/album.interface';
import { mergeMap }                from 'rxjs';
import { Notyf }                   from 'notyf';
import { MatDivider }              from '@angular/material/divider';
import { BenefitsTableComponent }  from '@modules/admin/admin/benefits/components/benefits-table/benefits-table.component';
import { BenefitsService }         from '@modules/admin/admin/benefits/benefits.service';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports    : [
    PageHeaderComponent,
    TranslocoDirective,
    BenefitsTableComponent,
    MatAnchor,
    RouterLink,
    MatButton,
    MatIconAnchor,
    MatIcon,
    MatTooltip,
    TranslocoPipe,
    MatDivider
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  public benefits$ = this._benefitsService.benefits$;
  private _notyf = new Notyf();

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _benefitsService: BenefitsService,
    private readonly _matDialog: MatDialog
  ) {}

  openNewDialog() {
    this._matDialog.open(NewOrEditComponent, {
      panelClass: 'dialog-mobile-fullscreen',
    });
  }

  edit(album: IAlbum) {
    console.log('Edit album', album);
  }

  delete(album: IAlbum) {
    console.log('Delete album', album);
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete album',
      message:
        'Are you sure you want to delete the album? This action cannot be undone.',
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed()
      .pipe(
        mergeMap((result) => {
          // If the confirm button pressed...
          if (result === 'confirmed') {
            // Delete the album
            return this._benefitsService.delete(album.id);
          }
          return [];
        })
      )
      .subscribe({
        next : () => {
          this._notyf.success('Album deleted');
        },
        error: (error) => {
          console.error('Delete album error', error);
          this._notyf.error('Error deleting album');
        }
      });
  }

  pageChange(event: any) {
    console.log('Page change', event);
  }
}
