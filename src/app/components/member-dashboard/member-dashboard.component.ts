import { Component } from '@angular/core';
import { CardComponent, SpinnerComponent } from '../../ui/components';
import { UserAnalytics } from '../../interfaces/analytics.interface';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { catchError, finalize, take, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CardComponent, SpinnerComponent,],
  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.scss'
})
export class MemberDashboardComponent {
  isLoading: boolean = false

  analytics: UserAnalytics = {
    booksBorrowedByUser: [],
    overDueBooksByUser: [],
  }

  constructor(
    private analyticsService: AnalyticsService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true

    this.analyticsService.getUserDashboard()
      .pipe(
        take(1),
        tap((analytics: UserAnalytics) => {
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
