import { Injectable }                                   from '@angular/core';
import { HttpClient }                                   from '@angular/common/http';
import { BehaviorSubject, map, Observable, retry, tap } from 'rxjs';
import { Api }                                          from '@core/interfaces/api';
import { Selector }                                     from '@modules/shared/selectors/model/selector';

@Injectable({providedIn: 'root'})
export class NewsCategoryService {
  constructor(private readonly _httpClient: HttpClient) { }

  private _selector$: BehaviorSubject<Selector[]> = new BehaviorSubject<Selector[]>([]);

  get selector$() {
    return this._selector$.asObservable();
  }

  getSelector(): Observable<Selector[]> {
    return this._httpClient.get<Api<Selector>>('api/news-category/selector')
      .pipe(
        retry({count: 3, delay: 1000, resetOnSuccess: true}),
        map((apiResponse: Api<Selector>) => apiResponse.content),
        tap((data: any) => this._selector$.next(data))
      );
  }
}