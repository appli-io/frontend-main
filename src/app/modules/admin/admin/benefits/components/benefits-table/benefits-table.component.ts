import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, MatSortHeader, Sort }                                                                  from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef }                            from '@angular/material/table';

import { TranslocoDirective } from '@ngneat/transloco';
import { Observable }         from 'rxjs';

import { trackByFn }                            from '@libs/ui/utils/utils';
import { Benefit }                              from '@modules/admin/admin/benefits/models/benefit';
import { Table }                                from '@modules/shared/table/table.component';
import { MatIcon }                              from '@angular/material/icon';
import { MatIconButton }                        from '@angular/material/button';
import { MatTooltip }                           from '@angular/material/tooltip';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector       : 'benefit-table',
  standalone     : true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports        : [
    Table,
    TranslocoDirective,
    MatColumnDef,
    MatSort,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatSortHeader,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl    : './benefits-table.component.html',
  styles         : [ `:host {
    width: 100%;
  }` ]
})
export class BenefitsTableComponent implements OnInit, OnDestroy {
  @Input('benefits') benefits$!: Observable<Benefit[]>;
  @Input() loading: boolean = false;
  @Output() readonly pageChange = new EventEmitter();
  @Output() readonly sortChange = new EventEmitter<Sort>();
  @Output() readonly delete = new EventEmitter();
  @Output() readonly edit = new EventEmitter();
  @Output() readonly view = new EventEmitter();
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  columns: string[] = [ 'title', 'type', 'category', 'company', 'discountsCount', 'actions' ];

  protected readonly trackByFn = trackByFn;

  ngOnInit() {}

  ngOnDestroy(): void {
  }

  openActions({$event, row}: { $event: MouseEvent, row: Benefit }) {
    $event.preventDefault();
    console.log('Action', row);
  }
}
