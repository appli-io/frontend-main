import { CommonModule }        from '@angular/common';
import { Component, OnInit }   from '@angular/core';
import { ActivatedRoute }      from '@angular/router';
import { IEvent }              from '@modules/admin/home/interface/event.interface';
import { TranslocoDirective }  from '@ngneat/transloco';
import { EventsService }       from '../../events.service';
import { PageHeaderComponent } from '@layout/components/page-header/page-header.component';

@Component({
    selector   : 'app-details',
    standalone : true,
    imports    : [
        CommonModule,
        TranslocoDirective,
        PageHeaderComponent,
    ],
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
    public event: IEvent | undefined;

    constructor(private route: ActivatedRoute, private eventsService: EventsService) {}

    ngOnInit(): void {
        const eventId = this.route.snapshot.paramMap.get('id');
        if (eventId) {
            this.loadEventDetails(eventId);
        }
    }

    private loadEventDetails(eventId: string): void {
        this.eventsService.getEvents().subscribe(events => {
            this.event = events.find(e => e.id === eventId);
        });
    }
}
