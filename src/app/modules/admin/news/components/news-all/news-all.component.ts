import { Component, OnInit }                                from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { takeUntilDestroyed }                               from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterOutlet }         from '@angular/router';
import { MatButtonModule }                                  from '@angular/material/button';
import { MatIconModule }                                    from '@angular/material/icon';
import { MatTooltipModule }                                 from '@angular/material/tooltip';

import { TranslocoDirective }                                    from '@ngneat/transloco';
import { DateTime }                                              from 'luxon';
import { distinctUntilChanged, lastValueFrom, Observable, skip } from 'rxjs';

import { Page }              from '@core/interfaces/page';
import { fuseAnimations }    from '@fuse/animations';
import { FuseCardComponent } from '@fuse/components/card';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { NewsService }       from '@modules/admin/news/news.service';
import { INewsCategory }     from '@modules/admin/news/domain/interfaces/category.interface';

import { INews } from '../../domain/interfaces/news.interface';

@Component({
  selector   : 'app-news-all',
  standalone : true,
  imports    : [ RouterOutlet, TranslocoDirective, MatIconModule, NgIf, UpperCasePipe, FuseFindByKeyPipe, NgClass, NgForOf, MatTooltipModule, MatButtonModule, RouterLink, FuseCardComponent, AsyncPipe ],
  templateUrl: './news-all.component.html',
  animations : fuseAnimations
})
export class NewsAllComponent implements OnInit {
  categories: INewsCategory[];
  newsList$: Observable<Page<INews>>;

  categoriesExpanded: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _newsService: NewsService
  ) {
    this.subscribeToQueryParamsChanges();
  }

  ngOnInit(): void {
    this.newsList$ = this._newsService.news;
    this.categories = this._route.snapshot.data.categories;
  }

  subscribeToQueryParamsChanges(): void {
    this._route.queryParams.pipe(
      skip(1),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      takeUntilDestroyed()
    ).subscribe((params: any) => {
      lastValueFrom(this._newsService.getNews({query: params})).then();
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  relativeTime = (date: number) => {
    return DateTime.fromMillis(date).toRelative();
  };
}
