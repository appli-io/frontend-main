import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { LayoutEnum }         from '@core/enums/layout.enum';
import { BaseService }        from '@core/interfaces/base-service.interface';
import { BenefitCompany }     from '@modules/admin/admin/benefits/models/benefit-company';
import { formDataFromObject } from '@core/utils';

@Injectable({providedIn: 'root'})
export class BenefitCompanyService implements BaseService<BenefitCompany> {
    private _baseUrl = 'api/benefits/company';

    constructor(private readonly _httpClient: HttpClient) { }

    private _companies$: BehaviorSubject<BenefitCompany[]> = new BehaviorSubject<BenefitCompany[]>([]);

    get companies$(): Observable<BenefitCompany[]> {
        return this._companies$.asObservable();
    }

    findAll(layout: LayoutEnum = LayoutEnum.FULL): Observable<BenefitCompany[]> {
        return this._httpClient.get<BenefitCompany[]>(this._baseUrl, {params: {layout}})
            .pipe(tap((companies) => this._companies$.next(companies)));
    }

    findOne(id: string): Observable<BenefitCompany> {
        return this._httpClient.get<BenefitCompany>(`${ this._baseUrl }/${ id }`);
    }

    create(data: BenefitCompany): Observable<BenefitCompany> {
        const formData = formDataFromObject(data);

        return this._httpClient.post<BenefitCompany>(this._baseUrl, formData);
    }

    update(data: BenefitCompany): Observable<BenefitCompany> {
        return this._httpClient.put<BenefitCompany>(`${ this._baseUrl }/${ data.id }`, data);
    }

    delete(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${ this._baseUrl }/${ id }`)
            .pipe(
                tap(() =>
                    this._companies$.next(this._companies$.value.filter((company) => company.id !== id))
                )
            );
    }
}
