import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseService }     from '@core/interfaces/base-service.interface';
import { BenefitCategory } from '@modules/admin/admin/benefits/models/benefit-category';
import { LayoutEnum }      from '@core/enums/layout.enum';

@Injectable({
  providedIn: 'root'
})
export class BenefitCategoryService implements BaseService<BenefitCategory> {

  constructor(private readonly _httpClient: HttpClient) { }

  findAll(layout: LayoutEnum = LayoutEnum.FULL): Observable<BenefitCategory[]> {
    return this._httpClient.get<BenefitCategory[]>('/api/benefits/category', {params: {layout}});
  }

  findOne(id: string): Observable<BenefitCategory> {
    return this._httpClient.get<BenefitCategory>(`/api/benefits/category/${ id }`);
  }

  create(data: BenefitCategory): Observable<BenefitCategory> {
    return this._httpClient.post<BenefitCategory>('/api/benefits/category', data);
  }

  update(data: BenefitCategory): Observable<BenefitCategory> {
    return this._httpClient.put<BenefitCategory>(`/api/benefits/category/${ data.id }`, data);
  }

  delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`/api/benefits/category/${ id }`);
  }
}
