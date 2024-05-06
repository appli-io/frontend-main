import { Routes }        from '@angular/router';
import { HomeComponent } from '@modules/admin/home/home.component';
import { inject }        from '@angular/core';
import { UserService }   from '@core/user/user.service';
import { NewsService }   from '@modules/admin/news/news.service';

export default [
  {
    path     : '',
    component: HomeComponent,
    resolve  : {
      assignedCompanies : () => inject(UserService).assignedCompanies$,
      user              : () => inject(UserService).user$,
      highlightedNews   : () => inject(NewsService).getHighlightedNews(),
    }
  }
] as Routes;
