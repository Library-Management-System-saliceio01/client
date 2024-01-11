import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DetailCardComponentData } from '../../interfaces/detail-card.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-detail-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailCardComponent {

  @Input() dataOption: DetailCardComponentData[] = []
  @Input() title = ''
}
