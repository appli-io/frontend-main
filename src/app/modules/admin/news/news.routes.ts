import { Routes }        from '@angular/router';
import { NewsComponent } from './news.component';

export default [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: 'all',
        loadChildren: () => import('./pages/news-all/news-all.routes')
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/news-category/news-category.routes')
      },
      {
        path: 'read',
        loadChildren: () => import('./pages/single-news/single-news.routes')
      },
      {
        path        : 'bio-bio',
        loadChildren: () => import('./pages/external-biobio/external-biobio.routes')
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      }
    ]
  }
] as Routes;
