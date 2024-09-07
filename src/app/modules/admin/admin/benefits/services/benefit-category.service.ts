import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { BaseService }        from '@core/interfaces/base-service.interface';
import { BenefitCategory }    from '@modules/admin/admin/benefits/models/benefit-category';
import { LayoutEnum }         from '@core/enums/layout.enum';
import { Selector }           from '@modules/shared/selectors/model/selector';
import { formDataFromObject } from '@core/utils';

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
        if (layout === LayoutEnum.SELECTOR) {
          this._selector$.next({
            categories  : categories.map((category) => ({
              label : category.name,
              value : category.id,
              parent: category.parent
            })), loading: false
          });
          return;
        }
      }));
  }

  findOne(id: string): Observable<BenefitCategory> {
    return this._httpClient.get<BenefitCategory>(`${ this._baseUrl }/${ id }`);
  }

  create(data: BenefitCategory): Observable<BenefitCategory> {
    const formData: FormData = formDataFromObject<BenefitCategory>(data);

    return this._httpClient.post<BenefitCategory>(this._baseUrl, formData);
  }

  update(data: BenefitCategory): Observable<BenefitCategory> {
    return this._httpClient.put<BenefitCategory>(`${ this._baseUrl }/${ data.id }`, data);
  }

  delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${ this._baseUrl }/${ id }`);
  }
}
