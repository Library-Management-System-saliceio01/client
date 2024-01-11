import { Component, Inject, OnInit } from '@angular/core';
import { ButtonComponent, InputFieldComponent } from '../../../ui/components';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '../../../interfaces/book.interface';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [InputFieldComponent, ButtonComponent, MatDialogModule,],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  isLoading: boolean = false

  title: FormControl = new FormControl('', [Validators.required])
  author: FormControl = new FormControl('', [Validators.required])
  genre: FormControl = new FormControl('', [Validators.required])
  isbn: FormControl = new FormControl('', [Validators.required])
  totalCopies: FormControl = new FormControl(0, [Validators.required])

  form: FormGroup = new FormGroup({
    title: this.title,
    author: this.author,
    genre: this.genre,
    isbn: this.isbn,
    totalCopies: this.totalCopies,
  })

  constructor(
    private dialogRef: MatDialogRef<BookFormComponent>,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.title.setValue(this.data.title)
      this.author.setValue(this.data.author)
      this.genre.setValue(this.data.genre)
      this.isbn.setValue(this.data.isbn)
      this.totalCopies.setValue(this.data.totalCopies)
    }
  }

  createBook(): void {
    if (this.form.invalid) {
      this.matSnackBar.open('Please complete all the required fields', 'X')
      return
    }

    this.dialogRef.close(this.form.value)
  }

  onClose(): void {
    this.dialogRef.close(null)
  }
}
