import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, InputFieldComponent, InputSelectComponent, SpinnerComponent } from '../../ui/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { catchError, finalize, take, tap, throwError } from 'rxjs';
import { ICustomSelectModel } from '../../ui/interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputFieldComponent, CardComponent, ButtonComponent, SpinnerComponent, InputSelectComponent,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading: boolean = false

  username: FormControl = new FormControl('', [Validators.required])
  name: FormControl = new FormControl('', [])
  password: FormControl = new FormControl('', [Validators.required])
  role: FormControl = new FormControl('', [Validators.required])

  form: FormGroup = new FormGroup({
    username: this.username,
    password: this.password,
    name: this.name,
    role: this.role,
  })

  roles: ICustomSelectModel[] = [
    {
      label: 'Member',
      value: 'member',
    },
    {
      label: 'Librarian',
      value: 'librarian',
    },
  ]

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  register(): void {
    if (this.form.invalid) {
      alert('Complete required fields')
      return
    }

    this.isLoading = true

    this.authenticationService.registerUser(this.form.value)
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
