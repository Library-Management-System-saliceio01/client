import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ui-input-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})

export class InputFieldComponent {
  @Input() control: FormControl = new FormControl()

  @Input() label = ''
  @Input() default_value = ''
  @Input() type = ''
  @Input() labelColor = 'white'

  @Input() required = false
  @Input() textArea = false
  @Input() max_width = false

  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>()

  onChange($event: any): void {
    this.changeEvent.emit($event.target.value)
  }
}
