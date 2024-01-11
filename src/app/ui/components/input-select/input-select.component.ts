import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ICustomSelectModel } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-input-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})

export class InputSelectComponent implements OnInit {
  @Output() changeEvent: EventEmitter<ICustomSelectModel> = new EventEmitter<ICustomSelectModel>()

  @Input() default_value: string | null = null

  @Input() valueOptions: ICustomSelectModel[] = []

  @Input() control: FormControl = new FormControl(null)

  @Input() label = ''
  @Input() labelColor = 'white'

  @Input() multiple = false
  @Input() required = false
  @Input() max_width = false
  @Input() disabled = false

  ngOnInit(): void {
    if (this.default_value) {
      this.control.setValue(this.default_value)
      return
    }

    if (this.multiple) {
      this.control.setValue([this.valueOptions[0]['value']] || '')
      return
    }

    this.changeEvent.emit({
      label: this.valueOptions[0] ? this.valueOptions[0]['label'] : '',
      value: null,
    })
  }

  onChange($event: MatSelectChange): void {
    // Multiple selection emit an array of ICustomSelectModel

    if (this.multiple) {
      const values: ICustomSelectModel[] = []

      this.valueOptions.forEach((customSelect: ICustomSelectModel) => {

        $event.value.forEach((result: string) => {
          if (result === customSelect.value) {
            values.push({
              label: customSelect.label,
              value: result
            })
          }
        })
      })

      if (!values.length) {
        this.control.setValue([this.valueOptions[0]['value']])
        this.changeEvent.emit([{
          label: this.valueOptions[0]['label'],
          value: this.valueOptions[0]['value']
        }] as any)
        return
      }

      this.changeEvent.emit(values as any)
      return
    }

    // Simple selection emit an objet of ICustomSelectModel

    const response = this.valueOptions.find((result) => {
      return $event.value === result.value
    })

    this.changeEvent.emit(response)
  }

  getClass(): { [key: string]: boolean } {
    return {
      'max-width-mat-field': this.max_width
    }
  }
}
