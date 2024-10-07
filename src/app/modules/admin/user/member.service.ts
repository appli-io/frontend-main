import { inject, Injectable }               from '@angular/core';
import { HttpClient }                       from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser }                            from '@modules/admin/user/profile/interfaces/user.interface';
import { Page }                             from '@core/interfaces/page';

@Injectable({providedIn: 'root'})
export class MemberService {
    private readonly _httpClient: HttpClient = inject(HttpClient);

    private _members$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
    private _user$: BehaviorSubject<IUser> = new BehaviorSubject(undefined);

    get user$(): Observable<IUser> {
        return this._user$.asObservable();
    }

    get members$(): Observable<IUser[]> {
        return this._members$.asObservable();
    }

    public update(data: any) {
        return this._httpClient.patch('api/users/me', data);
    }

    public updateContacts(data: any) {
        return this._httpClient.patch('api/users/contacts', data);
    }

    public updateAvatar(data: FormData) {
        return this._httpClient.patch('api/users/avatar', data);
    }

    public getCurrentUser() {
        return this._httpClient.get('api/auth/me')
            .pipe(tap((user: IUser) => this._user$.next(user)));
    }

    public getCompanyUsers(layout: 'contact' | 'member' | 'compact') {
        return this._httpClient.get<Page<IUser>>(`api/company/members`, {params: {layout}})
            .pipe(tap(({content}) => this._members$.next(content)));
    }
}
