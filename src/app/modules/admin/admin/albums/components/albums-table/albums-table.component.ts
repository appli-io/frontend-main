import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
}                                                                    from '@angular/material/table';
import { MatSort, MatSortHeader, Sort }                              from '@angular/material/sort';
import { trackByFn }                                                 from '@libs/ui/utils/utils';
import { DatePipe, NgClass }                                         from '@angular/common';
import { MatButton, MatIconAnchor, MatIconButton }                   from '@angular/material/button';
import { Observable, Subject, takeUntil }                            from 'rxjs';
import { IAlbum }                                                    from '@modules/admin/apps/albums/interfaces/album.interface';
import { MatIcon }                                                   from '@angular/material/icon';
import { RouterLink }                                                from '@angular/router';
import { MatTooltip }                                                from '@angular/material/tooltip';
import { TranslocoDirective }                                        from '@ngneat/transloco';

@Component({
  selector   : 'albums-table',
  standalone : true,
  imports: [
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatColumnDef,
    MatFooterCellDef,
    MatFooterCell,
    MatTable,
    MatSort,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    DatePipe,
    NgClass,
    MatButton,
    MatFooterRowDef,
    MatFooterRow,
    MatSortHeader,
    MatIconButton,
    MatIcon,
    MatIconAnchor,
    RouterLink,
    MatTooltip,
    TranslocoDirective
  ],
  templateUrl: './albums-table.component.html'
})
export class AlbumsTableComponent implements OnInit, OnDestroy {
  @Input('albums') albums$!: Observable<IAlbum[]>;
  @Input() loading: boolean = false;
  @Output() readonly pageChange = new EventEmitter();
  @Output() readonly sortChange = new EventEmitter<Sort>();
  @Output() readonly deleteAlbum = new EventEmitter();
  @Output() readonly editAlbum = new EventEmitter();
  @Output() readonly viewAlbum = new EventEmitter();

  albumsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  albumsTableColumns: string[] = [ 'coverImage', 'name', 'imagesCount', 'createdAt', 'views', 'actions' ];

  protected readonly trackByFn = trackByFn;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.albums$?.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((albums) => {
        this.albumsDataSource.data = albums;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
