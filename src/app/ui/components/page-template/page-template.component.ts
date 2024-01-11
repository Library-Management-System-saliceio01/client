import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ui-page-template',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent {
  @Input() title = ''
  @Input() translateTitle = ''
  @Input() icon = 'dashboard'

  @Input() filters = false
  @Input() actions = true
}
