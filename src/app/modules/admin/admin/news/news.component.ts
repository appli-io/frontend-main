import { Component }                    from '@angular/core';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatDialog }                    from '@angular/material/dialog';
import { MatIcon }                      from '@angular/material/icon';
import { MatTooltip }                   from '@angular/material/tooltip';

import { Notyf } from 'notyf';

import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';

import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PageHeaderComponent }     from '@layout/components/page-header/page-header.component';
import { NewNewsComponent }        from '@modules/admin/admin/news/dialogs/new-news/new-news.component';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { MatDivider }              from '@angular/material/divider';

@Component({
  selector   : 'app-news',
  standalone : true,
  imports    : [
    PageHeaderComponent,
    TranslocoDirective,
    MatIcon,
    MatIconAnchor,
    MatTooltip,
    MatFormFieldModule,
    MatIconButton,
    MatInputModule,
    MatDivider
  ],
  templateUrl: './news.component.html'
})
export class NewsComponent {
  private _notyf = new Notyf();

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _translocoService: TranslocoService,
    private readonly _translationService: TranslocoService,
    private readonly _matDialog: MatDialog,
  ) {}

  openNewDialog(): void {
    this._matDialog.open(NewNewsComponent, {
      panelClass: 'dialog-mobile-fullscreen',
    });
  }

  deleteNews(id: string): void {
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete News',
      message: 'Are you sure you want to delete this news? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Remove',
        },
      },
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Delete the list
        console.log('Delete member', id);
        // this._scrumboardService.deleteList(id).subscribe();
      }
    });
  }
}
