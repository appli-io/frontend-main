import { HttpClient }         from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { IUser }                               from '@modules/admin/profile/interfaces/user.interface';
import { Api }                                 from '@core/interfaces/api';
import { ICompany }                            from '@core/domain/interfaces/company.interface';

@Injectable({providedIn: 'root'})
export class UserService {
  private _httpClient = inject(HttpClient);
  private _user: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: IUser) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<IUser> {
    return this._user.asObservable();
  }

  get assignedCompanies$(): Observable<Partial<ICompany>[]> {
    return this.user$.pipe(map((user) => user?.assignedCompanies || []));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current signed-in user data
   */
  get(): Observable<IUser> {
    return this._httpClient.get<Api<IUser>>('api/auth/me').pipe(
      map(({content}) => content),
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: IUser): Observable<any> {
    return this._httpClient.patch<IUser>('api/common/user', {user}).pipe(
      map((response) => {
        this._user.next(response);
      }),
    );
  }
}
