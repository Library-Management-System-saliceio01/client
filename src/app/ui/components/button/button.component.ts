import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color: ThemePalette = 'primary';
  @Input() type = 'button';
  @Input() raised = false;
  @Input() flat = false;
  @Input() stroked = false;
  @Input() basic = false;
  @Input() disabled = false;
  @Input() icon = '';
  @Input() iconColor = '';
  @Input() isLoading = false;
  @Input() spinnerColor = 'primary';
  @Input() bg_white = false
  @Input() mat_menu = false
  @Input() full_width = false

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>()

  getClass() {
    return {
      [`mat-${this.color}`]: true,
      'mat-icon-button': !!this.icon,
      'bg-white': this.bg_white,
      'mat-menu': this.mat_menu,
      'full-width': this.full_width,
      [`icon-color-${this.iconColor}`]: true,
    };
  }

  onEmit(): void {
    this.clickEvent.emit()
  }
}
