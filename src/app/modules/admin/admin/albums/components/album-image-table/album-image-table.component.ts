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
import { IAlbumImage }                                               from '@modules/admin/apps/albums/interfaces/album-image.interface';

@Component({
  selector   : 'album-image-table',
  standalone : true,
  imports    : [
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
  templateUrl: './album-image-table.component.html'
})
export class AlbumImageTableComponent implements OnInit, OnDestroy {
  @Input('album') album$!: Observable<IAlbum>;
  @Input() loading: boolean = false;
  @Output() readonly pageChange = new EventEmitter();
  @Output() readonly sortChange = new EventEmitter<Sort>();
  @Output() readonly deleteImage = new EventEmitter();
  @Output() readonly viewImage = new EventEmitter();

  albumsDataSource: MatTableDataSource<IAlbumImage> = new MatTableDataSource();
  albumsTableColumns: string[] = [ 'image', 'format', 'size', 'createdAt', 'actions' ];

  protected readonly trackByFn = trackByFn;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.album$?.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((album) => {
        this.albumsDataSource.data = album.images;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  byteToKb(byte: number): number {
    return byte / 1024;
  }
}
