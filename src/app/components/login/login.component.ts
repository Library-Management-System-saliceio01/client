import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, InputFieldComponent, SpinnerComponent } from '../../ui/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { catchError, finalize, take, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, CardComponent, ButtonComponent, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false

  username: FormControl = new FormControl('', [Validators.required])
  password: FormControl = new FormControl('', [Validators.required])

  form: FormGroup = new FormGroup({
    username: this.username,
    password: this.password
  })

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  login(): void {
    if (this.form.invalid) {
      alert('Complete required fields')
      return
    }

    this.isLoading = true

    this.authenticationService.login(this.form.value)
      .pipe(
        take(1),
        tap(() => {
          this.router.navigateByUrl('/')
        }),
        catchError((err) => {
          return throwError(() => {
            alert(err.error.error)
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
