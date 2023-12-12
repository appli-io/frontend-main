import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { INews }                                                  from '../domain/interfaces/news.interface';

export const newsResolver: ResolveFn<INews> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return {
    body: 'body',
  } as INews;
};
