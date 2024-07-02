import { Component }                           from '@angular/core';
import { FuseConfirmationService }             from '@fuse/services/confirmation';
import { IEvent }                              from '@modules/admin/home/interface/event.interface';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatIcon }                             from '@angular/material/icon';
import { PageHeaderComponent }                 from '@layout/components/page-header/page-header.component';
import { RouterLink }                          from '@angular/router';

import { TranslocoDirective, TranslocoPipe }   from '@ngneat/transloco';

import { EventsService }        from '../../events.service';
import { EventsTableComponent } from '../../components/events-table/events-table.component';
import { MatDialog }            from '@angular/material/dialog';
import { NewOrEditComponent }         from '../../dialogs/new-or-edit/new-or-edit.component';
import { MatTooltip }           from '@angular/material/tooltip';
import { mergeMap } from 'rxjs';
import { Notyf } from 'notyf';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports    : [
    EventsTableComponent,
    MatAnchor,
    MatButton,
    MatIcon,
    MatIconAnchor,
    MatTooltip,
    PageHeaderComponent,
    RouterLink,
    TranslocoDirective,
    TranslocoPipe,
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  public events$ = this._eventsService.events$;
  private _notyf = new Notyf();

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _eventsService: EventsService,
    private readonly _matDialog: MatDialog
  ) {
  }

  openNewEventDialog() {
    this._matDialog.open(NewOrEditComponent, {
      panelClass: 'dialog-mobile-fullscreen',
    });
  }

  editEvent(event: IEvent) {
    console.log('Edit event', event);
  }

  deleteEvent(event: IEvent) {
    console.log('Delete event', event);
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete event',
      message:
        'Are you sure you want to delete the event? This action cannot be undone.',
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
          // Delete the event
          return this._eventsService.deleteEvent(event.id);
        }
        return [];
      })
    )
    .subscribe({
      next : () => {
        this._notyf.success('Event deleted');
      },
      error: (error) => {
        console.error('Delete event error', error);
        this._notyf.error('Error deleting event');
      }
    })
  }

  pageChange(event: any) {
    console.log('Page change', event);
  }
}
