import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() diameter = '80';
  @Input() spinnerButton = '';

  @Input() color: ThemePalette = 'primary';

  @Input() mode: ProgressSpinnerMode = 'indeterminate';

  @Input() value = 0;
  @Input() strokeWidth = 4;
}
