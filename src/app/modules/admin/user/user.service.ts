import { inject, Injectable } from '@angular/core';
import { HttpClient }         from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  public update(data: any) {
    return this._httpClient.patch('api/users/me', data);
  }

  public updateAvatar(data: FormData) {
    return this._httpClient.patch('api/users/avatar', data);
  }

  public getCurrentUser() {
    return this._httpClient.get('api/auth/me');
  }
}
