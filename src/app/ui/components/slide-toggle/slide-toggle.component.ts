import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'ui-slide-toggle',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent {
  @Input() color: ThemePalette = 'primary';

  @Input() label = ''

  @Input() checked = false;
  @Input() disabled = false;

  @Output() toggleChangeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChange(): void {
    this.toggleChangeEvent.emit(!this.checked)
  }
}
