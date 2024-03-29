import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  public message: string;
  public title: string

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string
      message: string
    }
  ) {
    this.title = data.title ? data.title : 'Confirmation'
    this.message = data.message ? data.message : '¿Do you want to continue?'
  }
}
