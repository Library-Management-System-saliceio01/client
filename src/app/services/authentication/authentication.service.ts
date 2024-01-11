import { Injectable, WritableSignal, signal } from '@angular/core';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { LoginRequest, LoginResponse } from '../../interfaces/authentication.interface';
import { User } from '../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string = `${environment.apiUrl}authentication/`;

  get isMember(): boolean {
    return this.currentUser.role === 'member';
  }

  get isLibrarian(): boolean {
    return this.currentUser.role === 'librarian';
  }

  #isAuthenticatedSignal: WritableSignal<boolean> = signal<boolean>(false);

  #loginSignal: WritableSignal<ApiResponse<LoginResponse>> = signal<ApiResponse<LoginResponse>>({
    data: {
      token: ''
    }
  });

  #currentUserSignal: WritableSignal<ApiResponse<User>> = signal<ApiResponse<User>>({
    data: null as unknown as User
  })

  set token(token: string) {
    this.#loginSignal.set({
      data: {
        token: token
      }
    })
  }

  set isAuthenticated(isAuthenticated: boolean) {
    this.#isAuthenticatedSignal.set(isAuthenticated);
  }

  set currentUser(user: User) {
    this.#currentUserSignal.set({
      data: user
    })
  }

  set storageToken(token: string) {
    localStorage.setItem('token', token)
  }

  get isAuthenticated(): boolean {
    return this.#isAuthenticatedSignal();
  }

  get currentUser(): User {
    return this.#currentUserSignal().data;
  }

  get token(): string {
    return this.#loginSignal().data.token;
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  login(data: LoginRequest): Observable<ApiResponse<User>> {
    return this.httpClient.post<ApiResponse<LoginResponse>>(`${this.apiUrl}login`, data)
      .pipe(
        tap((response: ApiResponse<LoginResponse>) => {
          this.storageToken = response.data.token
          this.token = response.data.token;
        }),
        switchMap(() => {
          return this.getcurrentUser()
        }),
        catchError((err) => {
          return throwError(() => {
            return err;
          })
        })
      )
  }

  getcurrentUser(): Observable<ApiResponse<User>> {
    return this.httpClient.get<ApiResponse<User>>(`${this.apiUrl}current-user`, {
      headers: {
        'Authorization': this.token,
      }
    })
      .pipe(
        tap((response: ApiResponse<User>) => {
          this.isAuthenticated = true;
          this.currentUser = response.data;
        }),
        catchError((err) => {
          return throwError(() => {
            this.isAuthenticated = false;
            return err;
          })
        })
      )
  }

  registerUser(data: User): Observable<ApiResponse<User>> {
    return this.httpClient.post<ApiResponse<User>>(`${this.apiUrl}register`, data, {
      headers: {
        'Authorization': this.token,
      }
    })
      .pipe(
        switchMap(() => {
          return this.login({ username: data.username, password: data.password })
            .pipe(
              tap(() => {
                this.router.navigateByUrl('/')
              })
            )
        }),
        catchError((err) => {
          return throwError(() => {
            return err;
          })
        })
      )
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null as unknown as User;
    this.token = '';
    localStorage.removeItem('token');
    //TODO: Remove and fix token bug
    window.location.reload()
  }
}
