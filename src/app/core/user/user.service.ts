import { HttpClient }         from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable, ReplaySubject } from 'rxjs';
import { IUser }                          from '@modules/admin/profile/interfaces/user.interface';
import { ICompany }                       from '@core/domain/interfaces/company.interface';
import { environment }                    from 'environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {
  private _backendUrl = environment.BACKEND_URL;
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

  /**
   * Update the user
   *
   * @param user
   */
  update(user: IUser): Observable<any> {
    return this._httpClient.patch<IUser>(this._backendUrl + 'api/common/user', {user}).pipe(
      map((response) => {
        this._user.next(response);
      }),
    );
  }
}
