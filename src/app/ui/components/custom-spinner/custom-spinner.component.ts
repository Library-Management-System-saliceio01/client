import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'ui-custom-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatDialogModule, SpinnerComponent,],
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.scss']
})
export class CustomSpinnerComponent {
  @Input() diameter = '80';
  @Input() spinnerButton = '';

  @Input() color: ThemePalette = 'primary';

  @Input() mode: ProgressSpinnerMode = 'indeterminate';

  @Input() value = 0;
}
