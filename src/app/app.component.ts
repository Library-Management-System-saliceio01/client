import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { take, tap } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.token = localStorage.getItem('token') as string

      this.authenticationService.getcurrentUser()
        .pipe(
          take(1),
          tap(() => {
            this.router.navigateByUrl('/')
          })
        ).subscribe()
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}
