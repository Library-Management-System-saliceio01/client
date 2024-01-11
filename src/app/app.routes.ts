import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { LibrarianDashboardComponent } from './components/librarian-dashboard/librarian-dashboard.component';
import { BookComponent } from './components/book/book.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'member',
    component: MemberDashboardComponent,
  },
  {
    path: 'librarian',
    component: LibrarianDashboardComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  }
];
