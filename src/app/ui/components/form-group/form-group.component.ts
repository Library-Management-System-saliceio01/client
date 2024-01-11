import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-form-group',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({})

  @Output() formChangeEvent: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.formChangeEvent.emit(value)
    })
  }
}
