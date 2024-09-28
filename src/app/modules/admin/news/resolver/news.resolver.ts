import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject }                                                 from '@angular/core';
import { NewsService }                                            from '@modules/admin/news/news.service';

export const newsResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    newsService: NewsService = inject(NewsService)
) => {
    return newsService.getNewsByIdOrSlug(route.params.idOrSlug);
};
