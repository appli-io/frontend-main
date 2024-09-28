import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject }                                                 from '@angular/core';
import { NewsService }                                            from '@modules/admin/news/news.service';

export const allNewsResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    newsService = inject(NewsService)
) => {
    const queryParams = route.queryParams;
    const pageable = {
        page: queryParams.page || 1,
        size: queryParams.size || 10,
    };

    return newsService.getNews({query: queryParams, pageable});
};
