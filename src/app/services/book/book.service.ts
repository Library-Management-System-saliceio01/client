import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { Book, CreateBookRequest, UpdateBookRequest } from '../../interfaces/book.interface';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl: string = `${environment.apiUrl}book/`;

  headers: any = {}

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.headers = {
      "Authorization": `${this.authenticationService.token}`
    }
  }

  createBook(data: CreateBookRequest): Observable<ApiResponse<Book>> {
    return this.httpClient.post<ApiResponse<Book>>(`${this.apiUrl}`, data, {
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

  getBook(id: string): Observable<ApiResponse<Book>> {
    return this.httpClient.get<ApiResponse<Book>>(`${this.apiUrl}${id}`, {
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

  searchBooks(query: string): Observable<ApiResponse<Book[]>> {
    return this.httpClient.get<ApiResponse<Book[]>>(`${this.apiUrl}search?${query}`, {
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

  updateBook(id: string, data: UpdateBookRequest): Observable<ApiResponse<Book>> {
    return this.httpClient.put<ApiResponse<Book>>(`${this.apiUrl}${id}`, data, {
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

  deleteBook(id: string): Observable<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.apiUrl}${id}`, {
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
