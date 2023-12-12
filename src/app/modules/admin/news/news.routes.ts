import { Routes }        from '@angular/router';
import { NewsComponent } from './news.component';

export default [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: 'all',
        loadChildren: () => import('./components/news-all/news-all.routes')
      },
      {
        path: 'category',
        loadChildren: () => import('./components/news-category/news-category.routes')
      },
      {
        path: ':id-or-slug',
        loadChildren: () => import('./components/single-news/single-news.routes')
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      }
    ]
  }
] as Routes;
