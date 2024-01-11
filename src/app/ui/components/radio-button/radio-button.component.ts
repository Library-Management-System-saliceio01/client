import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { RadioButtonComponentData } from '../../interfaces';

@Component({
  selector: 'ui-radio-button',
  standalone: true,
  imports: [CommonModule, MatRadioModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() radioButtonData: RadioButtonComponentData[] = [];

  @Output() radioChangeEvent: EventEmitter<MatRadioChange> = new EventEmitter<MatRadioChange>();

  radioChange(event: MatRadioChange): void {
    this.radioChangeEvent.emit(event);
  }
}
