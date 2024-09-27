import { inject, Injectable }               from '@angular/core';
import { HttpClient }                       from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser }                            from '@modules/admin/user/profile/interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class UserService {
    private readonly _httpClient: HttpClient = inject(HttpClient);

    private _user$: BehaviorSubject<IUser> = new BehaviorSubject(undefined);

    get user$(): Observable<IUser> {
        return this._user$.asObservable();
    }

    public update(data: any) {
        return this._httpClient.patch('api/users/me', data);
    }

    public updateAvatar(data: FormData) {
        return this._httpClient.patch('api/users/avatar', data);
    }

    public getCurrentUser() {
        return this._httpClient.get('api/auth/me')
            .pipe(tap((user: IUser) => this._user$.next(user)));
    }
}
