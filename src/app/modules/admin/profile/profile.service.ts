import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IUser } from '@modules/admin/profile/interfaces/user.interface';
import { Api }   from '@core/interfaces/api';

@Injectable({providedIn: 'root'})
export class ProfileService {
  constructor(private readonly _httpClient: HttpClient) {}

  getProfile(userId: number): Observable<Api<IUser>> {
    return this._httpClient.get<Api<IUser>>(`api/users/${ userId }`);
  }
}
