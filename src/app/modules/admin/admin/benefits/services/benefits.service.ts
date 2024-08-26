import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { BaseService } from '@core/interfaces/base-service.interface';
import { LayoutEnum }  from '@core/enums/layout.enum';
import { Benefit }     from '@modules/admin/admin/benefits/models/benefit';

@Injectable({providedIn: 'root'})
export class BenefitsService implements BaseService<Benefit> {
  private readonly _benefits$ = new BehaviorSubject<Benefit[]>(null);

  constructor(private readonly _httpClient: HttpClient) {}

  get benefits$(): Observable<Benefit[]> {
    return this._benefits$.asObservable();
  }

  findAll(layout: LayoutEnum = LayoutEnum.FULL): Observable<Benefit[]> {
    return this._httpClient.get<Benefit[]>('/api/benefits/benefit', {params: {layout}})
      .pipe(tap((benefits) => this._benefits$.next(benefits)));
  }

  findOne(id: string): Observable<Benefit> {
    return this._httpClient.get<Benefit>(`/api/benefits/${ id }`);
  }

  create(data: Benefit): Observable<Benefit> {
    const formData: FormData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    });

    return this._httpClient.post<Benefit>('/api/benefits', data);
  }

  update(data: Benefit): Observable<Benefit> {
    return this._httpClient.put<Benefit>(`/api/benefits/${ data.id }`, data);
  }

  delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`/api/benefits/${ id }`);
  }
}
