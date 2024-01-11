import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonComponent } from '../button/button.component';
import { ITableActions } from '../../interfaces';

@Component({
  selector: 'ui-menu',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, MatMenuModule, ButtonComponent,],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  @Input() icon = 'more_horiz'

  @Input() actions: ITableActions<any>[] = []
}
