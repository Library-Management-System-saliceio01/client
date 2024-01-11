import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: '',
})
export class HomeComponent implements OnInit {
  user: User = {} as User

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isMember) {
      this.router.navigateByUrl('/member')
    }

    if (this.authenticationService.isLibrarian) {
      this.router.navigateByUrl('/librarian')
    }
  }
}
