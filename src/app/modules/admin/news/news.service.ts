import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, map, Observable } from 'rxjs';

import { Api }      from '@core/interfaces/api';
import { Page }     from '@core/interfaces/page';
import { Pageable } from '@core/interfaces/pageable';

import { INews } from './domain/interfaces/news.interface';

const DEFAULT_PAGEABLE = {
  page: 0,
  size: 10,
};

@Injectable({providedIn: 'root'})
export class NewsService {
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

  getNews({query, pageable}: { query?: any, pageable?: Partial<Pageable> }): Observable<Page<any>> {
    if (!pageable) pageable = DEFAULT_PAGEABLE;

    const params: HttpParams = new HttpParams();

    if (query) Object.keys(query).forEach((key: string) => params.append(key, query[key]));
    params.append('page', pageable.page);
    params.append('size', pageable.size);

    const headers = {};

    headers['x-company-id'] = 'b1391dde-fd51-4378-8ee7-707130c4cb32';

    // fetch news and map it from Api to Page level
    return this._httpClient.get<Api<Page<any>>>('api/news', {params: params, headers}).pipe(
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
}
