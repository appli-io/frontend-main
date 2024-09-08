import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';

import { BaseService }                            from '@core/interfaces/base-service.interface';
import { BenefitCategory, BenefitCategoryMapper } from '@modules/admin/admin/benefits/models/benefit-category';
import { LayoutEnum }                             from '@core/enums/layout.enum';
import { Selector }                               from '@modules/shared/selectors/model/selector';
import { formDataFromObject }                     from '@core/utils';

@Injectable({providedIn: 'root'})
export class BenefitCategoryService implements BaseService<BenefitCategory> {
  private _baseUrl = 'api/benefits/category';
  private _categories$: BehaviorSubject<BenefitCategory[]> = new BehaviorSubject<BenefitCategory[]>([]);
  private _selector$: BehaviorSubject<{ categories: Selector[], loading: boolean }> = new BehaviorSubject<{
    categories: Selector[],
    loading: boolean
  }>({categories: [], loading: true});

  constructor(private readonly _httpClient: HttpClient) { }

  get categories$(): Observable<BenefitCategory[]> {
    return this._categories$.asObservable();
  }

  get selector$(): Observable<{ categories: Selector[], loading: boolean }> {
    return this._selector$.asObservable();
  }

  findAll(layout: LayoutEnum = LayoutEnum.FULL): Observable<BenefitCategory[]> {
    return this._httpClient.get<BenefitCategory[]>(this._baseUrl, {params: {layout}})
      .pipe(tap((categories) => {
        switch (layout) {
          case LayoutEnum.SELECTOR:
            this._selector$.next({categories: categories.map(BenefitCategoryMapper.toSelector), loading: false});
            break;
          default:
            this._categories$.next(categories);
        }
      }));
  }

  findOne(id: string): Observable<BenefitCategory> {
    return this._httpClient.get<BenefitCategory>(`${ this._baseUrl }/${ id }`);
  }

  create(data: any): Observable<BenefitCategory> {
    try {
      const formData: FormData = formDataFromObject<BenefitCategory>(data);

      return this._httpClient.post<BenefitCategory>(this._baseUrl, formData);
    } catch (error) {
      return throwError(() => new Error('Error creating category'));
    }
  }

  update(data: BenefitCategory): Observable<BenefitCategory> {
    return this._httpClient.put<BenefitCategory>(`${ this._baseUrl }/${ data.id }`, data);
  }

  delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${ this._baseUrl }/${ id }`)
      .pipe(
        tap(() => {
          this._categories$.next(this._categories$.value.filter((category) => category.id !== id));
        })
      );
  }
}
