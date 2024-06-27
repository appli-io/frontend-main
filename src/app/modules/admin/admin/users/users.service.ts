import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { Api } from '@core/interfaces/api';
import { Page } from '@core/interfaces/page';
import { CompanyUser } from '@modules/admin/admin/users/model/company-user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _companyMembers: BehaviorSubject<CompanyUser[]> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  get data$(): Observable<any> {
    return this._companyMembers.asObservable();
  }

  getData(): Observable<Page<CompanyUser>> {
    return this._httpClient.get<Api<Page<CompanyUser>>>('api/company/members')
      .pipe(
        map((response: Api<Page<CompanyUser>>) => response.content),
        tap((response: Page<CompanyUser>) => this._companyMembers.next(response.content)),
      );
  }


  sendMemberInvitation( { email, role, message }: { email: string, role: string, message: string }): Observable<any> {
    console.log('Sending Data:', { email, role, message });
    return this._httpClient.post(`api/company-user/invite`, { email, role, message });
  }
}
