import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibrarianAnalytics, UserAnalytics } from '../../interfaces/analytics.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl: string = `${environment.apiUrl}analytics/`;

  headers: any = {}

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.headers = {
      "Authorization": `${this.authenticationService.token}`
    }
  }

  getLibrarianDashboard(): Observable<LibrarianAnalytics> {
    return this.httpClient.get<LibrarianAnalytics>(`${this.apiUrl}librarian`, {
      headers: this.headers
    })
  }

  getUserDashboard(): Observable<UserAnalytics> {
    return this.httpClient.get<UserAnalytics>(`${this.apiUrl}member`, {
      headers: this.headers
    })
  }
}
