import { AsyncPipe }                from '@angular/common';
import { Component }                from '@angular/core';
import { ReactiveFormsModule }      from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField }             from '@angular/material/form-field';
import { MatIcon }                  from '@angular/material/icon';
import { MatInput }                 from '@angular/material/input';
import { MatProgressSpinner }       from '@angular/material/progress-spinner';
import { MatTooltip }               from '@angular/material/tooltip';

import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';

import { PageHeaderComponent } from '@layout/components/page-header/page-header.component';
import { trackByFn }           from '@libs/ui/utils/utils';
import { NewsService }         from '@modules/admin/admin/news/news.service';
import { INewsCategory }       from '@modules/admin/news/domain/interfaces/category.interface';
import { lastValueFrom }       from 'rxjs';

@Component({
    selector   : 'app-list',
    standalone : true,
    imports    : [
        TranslocoDirective,
        ReactiveFormsModule,
        MatFormField,
        MatProgressSpinner,
        MatIcon,
        MatButton,
        MatInput,
        MatIconButton,
        AsyncPipe,
        MatTooltip,
        TranslocoPipe,
        PageHeaderComponent
    ],
    templateUrl: './list.component.html'
})
export class ListComponent {
    categories$ = this._newsService.categories$;

    protected readonly trackByFn = trackByFn;

    constructor(
        private readonly _newsService: NewsService
    ) {}

    delete(category: INewsCategory) {
        console.log('Deleting category:', category);
        lastValueFrom(this._newsService.deleteCategory(category.id));
    }
}
