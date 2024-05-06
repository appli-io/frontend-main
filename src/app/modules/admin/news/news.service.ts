import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, map, Observable } from 'rxjs';

import { Api }           from '@core/interfaces/api';
import { Page }          from '@core/interfaces/page';
import { INewsCategory } from '@modules/admin/news/domain/interfaces/category.interface';

import { INews }       from './domain/interfaces/news.interface';
import { environment } from 'environments/environment';

const DEFAULT_PAGEABLE = {
  page: 1,
  size: 10,
};

@Injectable({providedIn: 'root'})
export class NewsService {
  private _backendUrl = environment.BACKEND_URL;
  private _newsQueryParams: string;

  constructor(private readonly _httpClient: HttpClient) { }

  private _news: BehaviorSubject<Page<INews>> = new BehaviorSubject(null);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get news(): Observable<Page<INews>> {
    return this._news.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  getNews({query = {}, pageable = DEFAULT_PAGEABLE}): Observable<Page<any>> {
    let params = new HttpParams();
    const queryKey = JSON.stringify({query, pageable});

    if (this._newsQueryParams === queryKey) return;

    this._newsQueryParams = queryKey;

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
        this._news.next(pageNews);
        return pageNews;
      })
    );
  }

  getNewsByIdOrSlug(idOrSlug: string): Observable<INews> {
    const headers = {};

    return this._httpClient.get<Api<INews>>(this._backendUrl + `api/news/${ idOrSlug }`, {headers}).pipe(
      map(({content}) => {
        const {publishedAt, updatedAt, ...news} = content;
        return {
          ...news,
          publishedAt: new Date(publishedAt),
          updatedAt  : new Date(updatedAt),
        };
      })
    );
  }

  getCategories(): Observable<any> {
    const headers = {};

    return this._httpClient.get<Api<INewsCategory[]>>(this._backendUrl + `api/news-category`, {headers}).pipe(
      map(({content}) => content)
    );
  }

  getHighlightedNews(): Observable<INews[]> {
    const headers = {};

    return this._httpClient.get<Api<INews[]>>(this._backendUrl + `api/news/highlighted`, {headers}).pipe(
      map(({content}) => content)
    );
  }
}
