import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { LibrarianAnalytics } from '../../interfaces/analytics.interface';
import { catchError, finalize, take, tap, throwError } from 'rxjs';
import { CardComponent, SpinnerComponent } from '../../ui/components';

@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [CardComponent, SpinnerComponent,],
  templateUrl: './librarian-dashboard.component.html',
  styleUrl: './librarian-dashboard.component.scss'
})
export class LibrarianDashboardComponent implements OnInit {
  isLoading: boolean = false

  analytics: LibrarianAnalytics = {
    countBooks: 0,
    userBorrowedBooks: 0,
    booksBorrowedExpiratedToday: [],
    usersWithBooksBorrowedExpirated: [],
  }

  constructor(
    private analyticsService: AnalyticsService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true

    this.analyticsService.getLibrarianDashboard()
      .pipe(
        take(1),
        tap((analytics: LibrarianAnalytics) => {
          this.analytics = analytics
        }),
        catchError((err) => {
          return throwError(() => {
            return err
          })
        }),
        finalize(() => {
          this.isLoading = false
        })
      )
      .subscribe()
  }
}
