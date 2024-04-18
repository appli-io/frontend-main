import { Routes } from '@angular/router';

import { newsResolver }        from '../../resolver/news.resolver';
import { SingleNewsComponent } from './single-news.component';

export default [
  {
    path   : ':idOrSlug',
    component: SingleNewsComponent,
    resolve: {news: newsResolver},
  },
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: '/news'
  }
] as Routes;
