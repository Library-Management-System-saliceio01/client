import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserBorrowBookService {
  private apiUrl: string = `${environment.apiUrl}user-borrow-book/`;

  headers: any = {}

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.headers = {
      "Authorization": `${this.authenticationService.token}`
    }
  }

  borrowBook(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.httpClient.get<ApiResponse<{ message: string }>>(`${this.apiUrl}take-book/${id}`, {
      headers: this.headers
    })
      .pipe(
        catchError((err) => {
          return throwError(() => {
            return err;
          })
        })
      );
  }

  returnBook(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.httpClient.get<ApiResponse<{ message: string }>>(`${this.apiUrl}return-book/${id}`, {
      headers: this.headers
    })
      .pipe(
        catchError((err) => {
          return throwError(() => {
            return err;
          })
        })
      );
  }
}
