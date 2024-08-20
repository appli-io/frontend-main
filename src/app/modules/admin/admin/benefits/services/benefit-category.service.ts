import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseService }     from '@core/interfaces/base-service.interface';
import { BenefitCategory } from '@modules/admin/admin/benefits/models/benefit-category';

@Injectable({
  providedIn: 'root'
})
export class BenefitCategoryService implements BaseService<BenefitCategory> {

  constructor(private readonly _httpClient: HttpClient) { }

  findAll(): Observable<BenefitCategory[]> {
    return this._httpClient.get<BenefitCategory[]>('/benefit-categories');
  }

  findOne(id: string): Observable<BenefitCategory> {
    return this._httpClient.get<BenefitCategory>(`/benefit-categories/${ id }`);
  }

  create(data: BenefitCategory): Observable<BenefitCategory> {
    return this._httpClient.post<BenefitCategory>('/benefit-categories', data);
  }

  update(data: BenefitCategory): Observable<BenefitCategory> {
    return this._httpClient.put<BenefitCategory>(`/benefit-categories/${ data.id }`, data);
  }

  delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`/benefit-categories/${ id }`);
  }
}
