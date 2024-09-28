import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe }                          from '@angular/common';
import { MatTooltip }                             from '@angular/material/tooltip';
import { RouterLink }                             from '@angular/router';

import { FuseCardComponent } from '@fuse/components/card';
import { INewsCategory }     from '@modules/admin/news/domain/interfaces/category.interface';

@Component({
    selector   : 'news-category-card',
    standalone : true,
    imports    : [
        FuseCardComponent,
        UpperCasePipe,
        RouterLink,
        MatTooltip
    ],
    templateUrl: './news-category-card.component.html'
})
export class NewsCategoryCardComponent {
    @Input() category: INewsCategory;
    @Input() index: number;

    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }
}
