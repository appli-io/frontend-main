import { Component, OnInit }                                from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { RouterLink, RouterOutlet }                         from '@angular/router';
import { MatIconModule }                                    from '@angular/material/icon';
import { MatTooltipModule }                                 from '@angular/material/tooltip';
import { MatButtonModule }                                  from '@angular/material/button';

import { TranslocoDirective } from '@ngneat/transloco';
import { DateTime }           from 'luxon';

import { FuseCardComponent } from '@fuse/components/card';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';

import { INews }       from '../../domain/interfaces/news.interface';
import { Observable }  from 'rxjs';
import { NewsService } from '@modules/admin/news/news.service';
import { Page }        from '@core/interfaces/page';

@Component({
  selector  : 'app-news-all',
  standalone: true,
  imports   : [ RouterOutlet, TranslocoDirective, MatIconModule, NgIf, UpperCasePipe, FuseFindByKeyPipe, NgClass, NgForOf, MatTooltipModule, MatButtonModule, RouterLink, FuseCardComponent, AsyncPipe ],
  templateUrl: './news-all.component.html'
})
export class NewsAllComponent implements OnInit {
  // categories$: INewsCategory[];
  newsList$: Observable<Page<INews>>;

  constructor(private readonly _newsService: NewsService) {}

  ngOnInit(): void {
    this.newsList$ = this._newsService.news;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  relativeTime = (date: number) => {
    return DateTime.fromMillis(date).toRelative();
  };
}
