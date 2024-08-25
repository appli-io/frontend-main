import { Injectable }     from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { BaseService }    from '@core/interfaces/base-service.interface';
import { BenefitCompany } from '@modules/admin/admin/benefits/models/benefit-company';
import { Observable }     from 'rxjs';
import { LayoutEnum }     from '@core/enums/layout.enum';

@Injectable({
  providedIn: 'root'
})
export class BenefitCompanyService implements BaseService<BenefitCompany> {

  constructor(private readonly _httpClient: HttpClient) { }

  findAll(layout: LayoutEnum = LayoutEnum.FULL): Observable<BenefitCompany[]> {
    return this._httpClient.get<BenefitCompany[]>('/api/benefits/company', {params: {layout}});
  }

  findOne(id: string): Observable<BenefitCompany> {
    return this._httpClient.get<BenefitCompany>(`/api/benefits/company/${ id }`);
  }

  create(data: BenefitCompany): Observable<BenefitCompany> {
    return this._httpClient.post<BenefitCompany>('/api/benefits/company', data);
  }

  update(data: BenefitCompany): Observable<BenefitCompany> {
    return this._httpClient.put<BenefitCompany>(`/api/benefits/company/${ data.id }`, data);
  }

  delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`/api/benefits/company/${ id }`);
  }
}
