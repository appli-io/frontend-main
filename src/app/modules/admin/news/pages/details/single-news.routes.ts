import { Routes } from '@angular/router';

import { newsResolver }     from '../../resolver/news.resolver';
import { DetailsComponent } from './details.component';

export default [
  {
    path   : ':idOrSlug',
    component: DetailsComponent,
    resolve: {news: newsResolver},
  },
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: '/news/all'
  }
] as Routes;
