import { Injectable }                            from '@angular/core';
import { HttpClient, HttpParams }                from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Page }                                  from '@core/interfaces/page';
import { CompanyUser }                           from '@modules/admin/admin/users/model/company-user.model';
import { DEFAULT_PAGEABLE }                      from '@core/constants';
import { CompanyUserInvite }                     from '@modules/admin/admin/users/model/company-user-invite.model';

@Injectable({providedIn: 'root'})
export class UsersService {
    constructor(private _httpClient: HttpClient) { }

    private _membersPage$: BehaviorSubject<Page<CompanyUser>> = new BehaviorSubject<Page<CompanyUser>>(null);

    get membersPage$() {
        return this._membersPage$.asObservable();
    }

    getMembers({query = {}, pageable = DEFAULT_PAGEABLE}): Observable<Page<CompanyUser>> {
        let params = new HttpParams();

        Object.keys(query).forEach(key => {
            params = params.append(key, query[key]);
        });
        params = params.append('page', pageable.page).append('size', pageable.size);

        return this._httpClient.get<Page<CompanyUser>>('api/company/members', {params}).pipe(
            map((content) => {
                const pageMembers: Page<CompanyUser> = {
                    ...content,
                    content: content.content.map((member) => ({...member, createdAt: new Date(member.createdAt)})),
                };
                return pageMembers;
            }),
            tap((response: Page<CompanyUser>) => this._membersPage$.next(response)),
        );
    }

    getInvitations(): Observable<CompanyUserInvite[]> {
        return this._httpClient.get<CompanyUserInvite[]>('/api/company-user/invitations');
    }

    sendMemberInvitation(invitation: any): Observable<CompanyUserInvite> {
        return this._httpClient.post<CompanyUserInvite>(`api/company-user/invite`, invitation)
            .pipe(tap((value) => console.log(value)));
    }
}
