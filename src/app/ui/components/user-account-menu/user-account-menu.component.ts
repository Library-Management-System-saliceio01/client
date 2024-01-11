import { Component, Input } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonComponent } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';
import { IMenuData } from '../../interfaces/menu-data.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-user-account-menu',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, MatMenuModule, ButtonComponent, MenuComponent],
  templateUrl: './user-account-menu.component.html',
  styleUrls: ['./user-account-menu.component.scss']
})

export class UserAccountMenuComponent {
  @Input() username = 'I'
  @Input() userEmail = ''
  @Input() menu_actions: IMenuData[] = []
}
