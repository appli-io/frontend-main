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
}                                                                     from '@angular/material/table';
import { MatSort, MatSortHeader, Sort }                               from '@angular/material/sort';
import { trackByFn }                                                  from '@libs/ui/utils/utils';
import { DatePipe, NgClass }                                          from '@angular/common';
import { MatButton, MatIconAnchor, MatIconButton }                    from '@angular/material/button';
import { Observable, Subject, takeUntil }                             from 'rxjs';
import { IEvent }                                                     from '@modules/admin/home/interface/event.interface';
import { MatIcon }                                                    from '@angular/material/icon';
import { RouterLink }                                                 from '@angular/router';
import { MatTooltip }                                                 from '@angular/material/tooltip';

@Component({
  selector: 'events-table',
  standalone: true,
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
    MatTooltip
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
  eventsTableColumns: string[] = ['title', 'description', 'location', 'startDate', 'endDate', 'actions'];

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
}
