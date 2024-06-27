import { Component, ContentChildren, Input, QueryList, ViewChild }                  from '@angular/core';
import { trackByFn }                                                                from '@libs/ui/utils/utils';
import { MatSort }                                                                  from '@angular/material/sort';
import { MatColumnDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { TranslocoDirective }                                                       from '@ngneat/transloco';
import { MatPaginator }                                                             from '@angular/material/paginator';
import { Observable }                                                               from 'rxjs';
import { IAlbum }                                                                   from '@modules/admin/apps/albums/interfaces/album.interface';

@Component({
  selector   : 'app-mat-table',
  standalone : true,
  imports    : [
    MatSort,
    MatTable,
    TranslocoDirective,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './mat-table.component.html'
})
export class MatTableComponent {
  @Input('data') albums$!: Observable<IAlbum[]>;

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  protected readonly trackByFn = trackByFn;
}
