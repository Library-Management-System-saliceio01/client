import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-icon-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() color: ThemePalette = 'primary';
  @Input() type = 'button';
  @Input() raised = false;
  @Input() flat = false;
  @Input() stroked = false;
  @Input() basic = false;
  @Input() disabled = false;
  @Input() icon = '';
  @Input() isLoading = false;
  @Input() spinnerColor = 'primary';
  @Input() bg_gray = false
  @Input() user_account = false
  @Input() bg_blue = false
  @Input() svg_path = ''
  @Input() menu_style = false
  @Input() sidebar = false

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>()

  getClass() {
    return {
      [`mat-${this.color}`]: true,
      'background-gray': this.bg_gray,
      'background-blue': this.bg_blue,
      'user-account': this.user_account,
      'menu-style': this.menu_style,
      'sidebar-style': this.sidebar,
    };
  }

  onEmit(): void {
    this.clickEvent.emit()
  }
}
