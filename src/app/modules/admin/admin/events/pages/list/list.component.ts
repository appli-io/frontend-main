import { Component, OnInit }           from '@angular/core';
import { TranslocoDirective }  from '@ngneat/transloco';
import { PageHeaderComponent } from '@layout/components/page-header/page-header.component';
import { CommonModule } from '@angular/common';
import { IEvent } from '@modules/admin/home/interface/event.interface';
import { EventsService } from '../../events.service';
import { RouterLink, RouterModule } from '@angular/router';
import { EventsTableComponent } from '../../components/events-table/events-table.component';
import { MatAnchor } from '@angular/material/button';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports    : [
    PageHeaderComponent,
    TranslocoDirective,
    EventsTableComponent,
    MatAnchor,
    RouterLink,
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  public events$ = this._eventsService.getEvents();

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _eventsService: EventsService) {}

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
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Delete the list
        console.log('Delete event', event.id);
        // this._scrumboardService.deleteList(id).subscribe();
      }
    });
  }

  pageChange(event: any) {
    console.log('Page change', event);
  }
}
