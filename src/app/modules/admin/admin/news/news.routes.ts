import { Routes }      from '@angular/router';
import { inject }      from '@angular/core';
import { NewsService } from '@modules/admin/admin/news/news.service';

export default [
  {
    path         : '',
    loadComponent: () => import('./news.component').then(m => m.NewsComponent),
    children     : [
      {
        path         : '',
        resolve      : {
          news: () => inject(NewsService).getNews({})
        },
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
      },
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
] as Routes;
