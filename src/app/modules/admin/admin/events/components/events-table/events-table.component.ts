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
import { IEvent }                                                    from '@modules/admin/home/interface/event.interface';
import { MatIcon }                                                   from '@angular/material/icon';
import { RouterLink }                                                from '@angular/router';
import { MatTooltip }                                                from '@angular/material/tooltip';
import { TranslocoDirective }                                        from '@ngneat/transloco';
import { DEFAULT_DATETIME_TIME_OPTIONS }                             from '@core/constants';

@Component({
  selector: 'events-table',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
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
    MatIcon,
    MatIconAnchor,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatTooltip,
    NgClass,
    RouterLink,
    TranslocoDirective
  ],
  templateUrl: './events-table.component.html'
})
export class EventsTableComponent implements OnInit, OnDestroy {
  @Input('events') events$!: Observable<IEvent[]>;
  @Input() loading: boolean = false;
  @Output() readonly pageChange = new EventEmitter();
  @Output() readonly sortChange = new EventEmitter<Sort>();
  @Output() readonly deleteEvent = new EventEmitter();
  @Output() readonly editEvent = new EventEmitter();
  @Output() readonly viewEvent = new EventEmitter();

  eventsDataSource: MatTableDataSource<IEvent> = new MatTableDataSource();
  eventsTableColumns: string[] = [ 'title', 'location', 'startDate', 'endDate', 'actions' ];

  protected readonly trackByFn = trackByFn;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.events$?.pipe(takeUntil(this._unsubscribeAll)).subscribe((events) => {
      this.eventsDataSource.data = events;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  protected readonly DEFAULT_DATETIME_TIME_OPTIONS = DEFAULT_DATETIME_TIME_OPTIONS;
}
