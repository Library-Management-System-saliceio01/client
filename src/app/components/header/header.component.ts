import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ButtonComponent, UserAccountMenuComponent } from '../../ui/components';
import { IMenuData } from '../../ui/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, ButtonComponent, UserAccountMenuComponent,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated
  }

  get userName(): string {
    return this.authenticationService.currentUser?.name?.substring(0, 2).toLocaleUpperCase() || 'User without name'
  }

  get isMember(): boolean {
    return this.authenticationService.isMember
  }

  get isLibrarian(): boolean {
    return this.authenticationService.isLibrarian
  }

  menuOptions: IMenuData[] = [
    {
      name: 'Logout',
      action: () => this.logout(),
    },
  ]

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  logout(): void {
    this.authenticationService.logout()
  }

  onRegister(): void {
    this.router.navigateByUrl('/register')
  }

  onLogin(): void {
    this.router.navigateByUrl('/login')
  }

  onBookRedirect(): void {
    this.router.navigateByUrl('/book')
  }

  onMemberAnalytics(): void {
    this.router.navigateByUrl('/member')
  }

  onLibrarianAnalytics(): void {
    this.router.navigateByUrl('/librarian')
  }
}
