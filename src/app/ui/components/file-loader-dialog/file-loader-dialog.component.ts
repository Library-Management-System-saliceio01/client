import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IFileLoaderDialogOptions } from '../../interfaces/file-loader-dialog.interface';
import { ButtonComponent } from '../button/button.component';
import { CustomSpinnerComponent } from '../custom-spinner/custom-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-file-loader-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonComponent, CustomSpinnerComponent],
  templateUrl: './file-loader-dialog.component.html',
  styleUrls: ['./file-loader-dialog.component.scss']
})
export class FileLoaderDialogComponent implements OnInit, OnDestroy {

  isLoading = false

  loadingSubscription: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IFileLoaderDialogOptions,
    public dialogRef: MatDialogRef<FileLoaderDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.data.isLoading.subscribe((result) => {
      this.isLoading = result

      if (!result) {
        this.dialogRef.close()
      }
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }
}
