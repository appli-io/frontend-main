import { Injectable }                                   from '@angular/core';
import { BehaviorSubject, map, Observable, retry, tap } from 'rxjs';
import { INews }                                        from '@modules/admin/news/domain/interfaces/news.interface';
import { HttpClient, HttpParams }                       from '@angular/common/http';
import { Page }                                         from '@core/interfaces/page';
import { Api }                                          from '@core/interfaces/api';
import { DEFAULT_PAGEABLE }                             from '@core/constants';
import { INewsCategory }                                from '@modules/admin/news/domain/interfaces/category.interface';

@Injectable({providedIn: 'root'})
export class NewsService {
  private _newsPage$: BehaviorSubject<Page<INews>> = new BehaviorSubject<Page<INews>>(null);
  private _categories$: BehaviorSubject<INewsCategory[]> = new BehaviorSubject<INewsCategory[]>(null);

  constructor(private _httpClient: HttpClient) { }

  get newsPage() {
    return this._newsPage$.asObservable();
  }

  getNews({query = {}, pageable = DEFAULT_PAGEABLE}): Observable<Page<any>> {
    let params = new HttpParams();
    const queryKey = JSON.stringify({query, pageable});

    Object.keys(query).forEach(key => {
      params = params.append(key, query[key]);
    });
    params = params.append('page', pageable.page).append('size', pageable.size);

    return this._httpClient.get<Api<Page<any>>>('api/news', {params}).pipe(
      map(({content}) => {
        const pageNews: Page<INews> = {
          ...content,
          content: content.content.map(({publishedAt, updatedAt, ...news}) => ({
            ...news,
            publishedAt: new Date(publishedAt),
            updatedAt  : new Date(updatedAt),
          })),
        };
        this._newsPage$.next(pageNews);
        return pageNews;
      })
    );
  }

  getCategories(): Observable<INewsCategory[]> {
    return this._httpClient.get<Api<INewsCategory[]>>('api/news-category').pipe(
      retry({count: 3, delay: 1000, resetOnSuccess: true}),
      map(({content}) => content),
      tap(categories => this._categories$.next(categories))
    );
  }
}
