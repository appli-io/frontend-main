import { Component, Input } from '@angular/core';
import { UpperCasePipe }    from '@angular/common';

@Component({
    selector   : 'news-list-header',
    standalone : true,
    imports    : [
        UpperCasePipe
    ],
    templateUrl: './news-list-header.component.html'
})
export class NewsListHeaderComponent {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() description: string;
    @Input() bgImage: string;
}
