import { Routes }          from '@angular/router';
import { ListComponent }   from './list.component';
import { inject }          from '@angular/core';
import { NewsService }     from '@modules/admin/news/news.service';
import { allNewsResolver } from '@modules/admin/news/resolver/all-news.resolver';

export default [
    {
        path     : '',
        component: ListComponent,
        resolve  : {
            news      : allNewsResolver,
            categories: () => inject(NewsService).getCategories()
        }
    }
] as Routes;
