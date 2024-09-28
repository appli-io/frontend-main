import { Component }    from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector   : 'app-news',
    standalone : true,
    imports    : [
        RouterOutlet
    ],
    templateUrl: './news.component.html'
})
export class NewsComponent {

}
