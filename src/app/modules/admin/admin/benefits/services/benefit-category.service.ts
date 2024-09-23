import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';

import { BaseService }             from '@core/interfaces/base-service.interface';
import { BenefitCategory }         from '@modules/admin/admin/benefits/models/benefit-category';
import { LayoutEnum }              from '@core/enums/layout.enum';
import { formDataFromObject }      from '@core/utils';
import { Benefit }                 from '@modules/admin/admin/benefits/models/benefit';
import { FuseSplashScreenService } from '../../../../../../@fuse/services/splash-screen';

@Injectable({providedIn: 'root'})
export class BenefitCategoryService implements BaseService<BenefitCategory> {
  private _baseUrl = 'api/benefit-category';
  private _categories$: BehaviorSubject<BenefitCategory[]> = new BehaviorSubject<BenefitCategory[]>([]);
  private _selectedCategory$: BehaviorSubject<BenefitCategory> = new BehaviorSubject<BenefitCategory>(null);

  constructor(private readonly _httpClient: HttpClient, private readonly _ss: FuseSplashScreenService) { }

  get selectedCategory$(): Observable<BenefitCategory> {
    return this._selectedCategory$.asObservable();
  }

  get categories$(): Observable<BenefitCategory[]> {
    return this._categories$.asObservable();
  }

  private _selectedCategoryBenefits$: BehaviorSubject<Benefit[]> = new BehaviorSubject<Benefit[]>([]);

  get selectedCategoryBenefits$(): Observable<Benefit[]> {
    return this._selectedCategoryBenefits$.asObservable();
  }

  findAll(layout: LayoutEnum = LayoutEnum.FULL, ...args: any): Observable<BenefitCategory[]> {
    return this._httpClient.get<BenefitCategory[]>(this._baseUrl, {params: {layout, ...args as any}})
      .pipe(tap((categories) => {
        switch (layout) {
          case LayoutEnum.SELECTOR:
            break;
          default:
            this._categories$.next(categories);
        }
      }));
  }

  findOne(id: string): Observable<BenefitCategory> {
    return this._httpClient.get<BenefitCategory>(`${ this._baseUrl }/${ id }`)
      .pipe(tap((category) => {
        this._selectedCategory$.next(category);
      }));
  }

  findOneBenefits(id: string): Observable<Benefit[]> {
    this._selectedCategoryBenefits$.next(undefined);

    return this._httpClient.get<Benefit[]>(`${ this._baseUrl }/${ id }/benefits`)
      .pipe(tap((benefits) => this._selectedCategoryBenefits$.next(benefits)));
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

  findMostViewed() {
    return this._httpClient.get<BenefitCategory[]>(`${ this._baseUrl }/most-viewed`, {params: {limit: 3}});
  }

  removeSelectedCategory() {
    this._selectedCategory$.next(undefined);
    console.log(this._selectedCategory$.value);
  }
}
