import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { BaseService }        from '@core/interfaces/base-service.interface';
import { LayoutEnum }         from '@core/enums/layout.enum';
import { Benefit }            from '@modules/admin/admin/benefits/models/benefit';
import { formDataFromObject } from '@core/utils';

@Injectable({providedIn: 'root'})
export class BenefitsService implements BaseService<Benefit> {
    private readonly _benefits$ = new BehaviorSubject<Benefit[]>(null);

    constructor(private readonly _httpClient: HttpClient) {}

    get benefits$(): Observable<Benefit[]> {
        return this._benefits$.asObservable();
    }

    set benefits$(value: Benefit[]) {
        this._benefits$.next(value);
    }

    findAll(layout: LayoutEnum = LayoutEnum.FULL, query: any = undefined): Observable<Benefit[]> {
        const params = {layout};

        if (query) Object.assign(params, query);

        return this._httpClient.get<Benefit[]>('/api/benefits/benefit', {params: params})
            .pipe(tap((benefits) => this._benefits$.next(benefits)));
    }

    findOne(id: string): Observable<Benefit> {
        return this._httpClient.get<Benefit>(`/api/benefits/benefit/${ id }`);
    }

    create(data: Benefit): Observable<Benefit> {
        const formData: FormData = formDataFromObject<Benefit>(data);

        return this._httpClient.post<Benefit>('/api/benefits/benefit', formData);
    }

    update(data: Benefit): Observable<Benefit> {
        return this._httpClient.put<Benefit>(`/api/benefits/benefit/${ data.id }`, data);
    }

    delete(id: string): Observable<void> {
        return this._httpClient.delete<void>(`/api/benefits/benefit/${ id }`);
    }

    // Custom methods
    findMostViewed() {
        return this._httpClient.get<Benefit[]>('/api/benefits/benefit/most-viewed', {params: {limit: 3}});
    }
}
