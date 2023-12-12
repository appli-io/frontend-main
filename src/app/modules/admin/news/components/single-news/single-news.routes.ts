import { Routes } from '@angular/router';

import { newsResolver }        from '../../resolver/news.resolver';
import { SingleNewsComponent } from './single-news.component';

export default [
  {
    path: '',
    resolve: {
      resolvedNews: newsResolver
    },
    component: SingleNewsComponent,
  }
] as Routes;
