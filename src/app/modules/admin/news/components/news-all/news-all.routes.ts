import { Routes }           from '@angular/router';
import { NewsAllComponent } from './news-all.component';
import { inject }           from '@angular/core';
import { NewsService }      from '@modules/admin/news/news.service';

export default [
  {
    path     : '',
    component: NewsAllComponent,
    resolve: {
      news: () => inject(NewsService).getNews({})
    }
  }
] as Routes;
