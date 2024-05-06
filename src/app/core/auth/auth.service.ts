import { HttpClient }                                                                 from '@angular/common/http';
import { inject, Injectable }                                                         from '@angular/core';
import { AuthUtils }                                                                  from 'app/core/auth/auth.utils';
import { UserService }                                                                from 'app/core/user/user.service';
import { catchError, lastValueFrom, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Api }                                                                        from '@core/interfaces/api';
import { ICompany }                                                                   from '@core/domain/interfaces/company.interface';
import { environment }                                                                from 'environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  private _backendUrl = environment.BACKEND_URL;
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private _userService = inject(UserService);

  private _activeCompany: ICompany = undefined;

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get activeCompany(): ICompany {
    return this._activeCompany;
  }

  set activeCompany(company: ICompany) {
    this._activeCompany = company;
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post(this._backendUrl + 'api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post(this._backendUrl + 'api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { emailOrUsername: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    localStorage.removeItem('accessToken');

    return this._httpClient.post(this._backendUrl + 'api/auth/sign-in', credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.accessToken;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
        this._userService.user = response.user;
        this.activeCompany = response.company;

        // Return a new observable with the response
        return of(response);
      }),
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._httpClient.post(this._backendUrl + 'api/auth/refresh-access', {})
      .pipe(
        catchError(async () => {
          await this.signOut();
          this._authenticated = false;
          location.reload();

          return of(false);
        }),
        switchMap((response: any) => {
          // Replace the access token with the new one if it's available on
          // the response object.
          //
          // This is an added optional step for better security. Once you sign
          // in using the token, you should generate a new one on the server
          // side and attach it to the response object. Then the following
          // piece of code can replace the token with the refreshed one.
          if (response.accessToken) {
            this.accessToken = response.accessToken;
          }

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = response.user;
          this.activeCompany = response.company;

          // Return true
          return of(true);
        }),
      );
  }

  /**
   * Sign out
   */
  async signOut() {
    // Remove session from backend and blacklist the token
    await lastValueFrom(this._httpClient.post(this._backendUrl + 'api/auth/sign-out', {}));

    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return true;
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    const post = {
      name     : user.name,
      email    : user.email,
      password1: user.password,
      password2: user.password,
    };
    return this._httpClient.post(this._backendUrl + 'api/auth/sign-up', post);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post(this._backendUrl + 'api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      console.log('No access token');
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      console.log('Access token expired');
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.signInUsingToken();
  }

  /**
   * Set active company, by saving active company in the localStorage in the following structure:
   * ``` json
   * [
   *  {
   *    userId: 1,
   *    companyId: 'uuid_value'
   *  }
   * ]
   * ```
   *
   * @param companyId
   */
  setActiveCompany(companyId: string): Observable<any> {
    return this._httpClient.post<any>(this._backendUrl + 'api/auth/active-company', {companyId})
      .pipe(tap((response) => {
        this.accessToken = response.accessToken;
        this._userService.user = response.user;
        this.activeCompany = response.company;
      }));
  }

  /**
   * Validate if user is member of the company
   */
  isUserInCompany = (companyId: string): Observable<boolean> =>
    this._httpClient.get<Api<boolean>>(`api/company-user/${ companyId }/validate-user`)
      .pipe(map(({content}) => content));
}
