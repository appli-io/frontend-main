import { Component }                    from '@angular/core';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatDialog }                    from '@angular/material/dialog';
import { MatDivider }                   from '@angular/material/divider';
import { MatFormFieldModule }           from '@angular/material/form-field';
import { MatIcon }                      from '@angular/material/icon';
import { MatInputModule }               from '@angular/material/input';
import { MatTooltip }                   from '@angular/material/tooltip';

import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { Notyf }                                from 'notyf';

import { FuseConfirmationService }       from '@fuse/services/confirmation';
import { PageHeaderComponent }           from '@layout/components/page-header/page-header.component';
import { NewNewsComponent }              from '@modules/admin/admin/news/dialogs/new-news/new-news.component';
import { Table }                         from '@modules/shared/table/table.component';
import { BehaviorSubject }               from 'rxjs';
import { INews }                         from '@modules/admin/news/domain/interfaces/news.interface';
import { Pageable }                      from '@core/interfaces/pageable';
import { takeUntilDestroyed }            from '@angular/core/rxjs-interop';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { NewsService }                   from '@modules/admin/admin/news/news.service';
import { MatTableModule }                from '@angular/material/table';
import { MatSort, MatSortHeader }        from '@angular/material/sort';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports: [
    PageHeaderComponent,
    TranslocoDirective,
    MatIcon,
    MatIconAnchor,
    MatTooltip,
    MatFormFieldModule,
    MatIconButton,
    MatInputModule,
    MatTableModule,
    MatDivider,
    Table,
    AsyncPipe,
    JsonPipe,
    DatePipe,
    MatSortHeader,
    MatSort,
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  public news$: BehaviorSubject<INews[]> = new BehaviorSubject<INews[]>(null);
  public pageable$: BehaviorSubject<Pageable> = new BehaviorSubject<Pageable>(null);
  public readonly displayedColumns: string[] = [ 'title', 'cover', 'publishedAt', 'actions' ];
  private _notyf = new Notyf();

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _newsService: NewsService,
    private readonly _translationService: TranslocoService,
    private readonly _matDialog: MatDialog,
  ) {
    this._newsService.newsPage
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (page) => {
          if (page) {
            this.news$.next(page.content);
            this.pageable$.next(page.pageable);
          }
        }
      });
  }

  openNewDialog(): void {
    this._matDialog.open(NewNewsComponent, {
      panelClass: 'dialog-mobile-fullscreen',
    });
  }

  deleteNews(id: string): void {
    const confirmation = this._fuseConfirmationService.open({
      title  : this._translationService.translate('admin.news.delete.title'),
      message: this._translationService.translate('admin.news.delete.message'),
      actions: {
        confirm: {
          label: this._translationService.translate('admin.news.delete.confirm'),
        },
        cancel : {}
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
