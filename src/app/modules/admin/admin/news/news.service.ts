import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { TranslocoService }                                                               from '@ngneat/transloco';
import { Notyf }                                                                          from 'notyf';
import { BehaviorSubject, catchError, map, mergeMap, Observable, retry, tap, throwError } from 'rxjs';

import { DEFAULT_PAGEABLE } from '@core/constants';
import { INews }            from '@modules/admin/news/domain/interfaces/news.interface';
import { Page }             from '@core/interfaces/page';
import { Api }              from '@core/interfaces/api';
import { INewsCategory }    from '@modules/admin/news/domain/interfaces/category.interface';

@Injectable({providedIn: 'root'})
export class NewsService {
  private _newsPage$: BehaviorSubject<Page<INews>> = new BehaviorSubject<Page<INews>>(null);
  private _categories$: BehaviorSubject<INewsCategory[]> = new BehaviorSubject<INewsCategory[]>(null);
  private _notyf = new Notyf();

  constructor(
    private _httpClient: HttpClient,
    private _translateService: TranslocoService
  ) { }

  get newsPage() {
    return this._newsPage$.asObservable();
  }

  getNews({query = {}, pageable = DEFAULT_PAGEABLE}): Observable<Page<INews>> {
    console.log('getNews', query, pageable);
    let params = new HttpParams();

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

  delete(id: string): Observable<Page<INews>> {
    return this._httpClient.delete<void>(`api/news/${ id }`).pipe(
      tap(() => this._notyf.success(this._translateService.translate('admin.news.delete.success'))),
      tap(() => this._newsPage$.next(null)),
      catchError(() => {
        this._notyf.error(this._translateService.translate('admin.news.delete.error'));
        return throwError(() => new Error('admin.news.delete.error'));
      }),
      mergeMap(() => this.getNews({}))
    );
  }
}
