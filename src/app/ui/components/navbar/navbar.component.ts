import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../interfaces';

@Component({
  selector: 'ui-navbar',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() routes: Navbar[] = []
}
