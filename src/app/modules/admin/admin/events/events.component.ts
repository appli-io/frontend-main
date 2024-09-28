import { Component }    from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector   : 'app-events',
    standalone : true,
    imports    : [
        RouterOutlet
    ],
    templateUrl: './events.component.html'
})
export class EventsComponent {

}
