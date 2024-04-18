import { Routes }           from '@angular/router';
import { NewsAllComponent } from './news-all.component';
import { inject }           from '@angular/core';
import { NewsService }      from '@modules/admin/news/news.service';
import { allNewsResolver }  from '@modules/admin/news/resolver/all-news.resolver';

export default [
  {
    path     : '',
    component: NewsAllComponent,
    resolve: {
      news      : allNewsResolver,
      categories: () => inject(NewsService).getCategories()
    }
  }
] as Routes;
