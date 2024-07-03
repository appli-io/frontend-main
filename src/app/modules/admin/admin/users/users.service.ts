import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Api } from '@core/interfaces/api';
import { Page } from '@core/interfaces/page';
import { CompanyUser, InvitationsResponse } from '@modules/admin/admin/users/model/company-user.model';
import { DEFAULT_PAGEABLE } from '@core/constants';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _companyMembers: BehaviorSubject<CompanyUser[]> = new BehaviorSubject(null);
  private _membersPage$: BehaviorSubject<Page<CompanyUser>> = new BehaviorSubject<Page<CompanyUser>>(null);

  constructor(private _httpClient: HttpClient) { }

  get data$(): Observable<any> {
    return this._companyMembers.asObservable();
  }

  get membersPage() {
    return this._membersPage$.asObservable();
  }

  getData(): Observable<Page<CompanyUser>> {
    return this._httpClient.get<Api<Page<CompanyUser>>>('api/company/members')
      .pipe(
        map((response: Api<Page<CompanyUser>>) => response.content),
        tap((response: Page<CompanyUser>) => this._companyMembers.next(response.content)),
      );
  }

  getMembers({ query = {}, pageable = DEFAULT_PAGEABLE }): Observable<Page<CompanyUser>> {
    let params = new HttpParams();

    Object.keys(query).forEach(key => {
      params = params.append(key, query[key]);
    });
    params = params.append('page', pageable.page).append('size', pageable.size);

    return this._httpClient.get<Api<Page<CompanyUser>>>('api/company/members', { params }).pipe(
      map(({ content }) => {
        const pageMembers: Page<CompanyUser> = {
          ...content,
          content: content.content.map((member) => ({
            ...member,
            createdAt: new Date(member.createdAt),
          })),
        };
        this._membersPage$.next(pageMembers);
        return pageMembers;
      })
    );
  }

  getInvitations(): Observable<InvitationsResponse> {
    return this._httpClient.get<InvitationsResponse>('/api/company-user/invitations');
  }

  sendMemberInvitation({ email, role, message }: { email: string, role: string, message: string }): Observable<any> {
    console.log('Sending Data:', { email, role, message });
    return this._httpClient.post(`api/company-user/invite`, { email, role, message });
  }
}
