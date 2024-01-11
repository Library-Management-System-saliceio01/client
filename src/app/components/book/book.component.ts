import { Component, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { BaseTableComponent, ButtonComponent, CardComponent, InputFieldComponent, SpinnerComponent } from '../../ui/components';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BookFormComponent } from './book-form/book-form.component';
import { catchError, finalize, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { Book } from '../../interfaces/book.interface';
import { IBaseTable } from '../../ui/interfaces';
import { BookService } from '../../services/book/book.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { bookColumns } from './book.columns';
import { UserBorrowBookService } from '../../services/user-borrow-book/user-borrow-book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CardComponent, BaseTableComponent, ButtonComponent, SpinnerComponent, InputFieldComponent,],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  books: WritableSignal<Book[]> = signal<Book[]>([])

  isLoading: boolean = false

  title: FormControl = new FormControl('', [])
  author: FormControl = new FormControl('', [])
  genre: FormControl = new FormControl('', [])

  baseTableOptions: IBaseTable<Book> = {
    dataSource: [],
    columns: bookColumns,
    actions: [
      {
        name: 'Update',
        icon: 'edit',
        action: (element: Book) => {
          this.onUpdateBook({ ...element, id: this.books().find((book: Book) => book.title === element.title)?.id as string })
        },
        hide: () => !this.isLibrarian,
      },
      {
        name: 'Delete',
        icon: 'delete',
        action: (element: Book) => {
          this.onDeleteBook({ ...element, id: this.books().find((book: Book) => book.title === element.title)?.id as string })
        },
        hide: () => !this.isLibrarian,
      },
      {
        name: 'Return Book',
        icon: 'delete',
        action: (element: Book) => {
          this.onReturnBook(this.books().find((book: Book) => book.title === element.title)?.id as string)
        },
        hide: (element: Book) => (!this.isLibrarian || !element.isBorrowed) as boolean,
      },
      {
        name: 'Take Book',
        icon: 'delete',
        action: (element: Book) => {
          this.onTakeBook(this.books().find((book: Book) => book.title === element.title)?.id as string)
        },
        hide: (element: Book) => (!this.isMember || element.isBorrowed) as boolean,
      },
    ],
    paginateOptions: {
      page: 0,
      pageSize: 25,
      pageSizeOptions: [25, 50, 100],
    }
  }

  get isLibrarian(): boolean {
    return this.authenticationService.isLibrarian
  }

  get isMember(): boolean {
    return this.authenticationService.isMember
  }

  constructor(
    private dialog: MatDialog,
    private bookService: BookService,
    private authenticationService: AuthenticationService,
    private userBorrowService: UserBorrowBookService,
    private matSnackBar: MatSnackBar,
  ) {
    effect(() => {
      this.baseTableOptions = {
        ...this.baseTableOptions,
        dataSource: this.books()
      }
    })
  }

  ngOnInit(): void {
    this.getBooks()
  }

  onPageChange(event: PageEvent): void {
    this.baseTableOptions.paginateOptions = {
      ...this.baseTableOptions.paginateOptions,
      page: event.pageIndex,
      pageSize: event.pageSize,
    }

    this.getBooks()
  }

  onReturnBook(id: string): void {
    this.isLoading = true

    this.userBorrowService.returnBook(id)
      .pipe(
        take(1),
        tap(() => {
          this.getBooks()
        }),
        catchError((err) => {
          return throwError(() => {
            this.matSnackBar.open(err.error.error, 'X')
          })
        }),
        finalize(() => {
          this.isLoading = false
        })
      )
      .subscribe()
  }

  onTakeBook(id: string): void {
    this.isLoading = true

    this.userBorrowService.borrowBook(id)
      .pipe(
        take(1),
        tap(() => {
          this.getBooks()
        }),
        catchError((err) => {
          return throwError(() => {
            this.matSnackBar.open(err.error.error, 'X')
          })
        }),
        finalize(() => {
          this.isLoading = false
        })
      )
      .subscribe()
  }

  onDeleteBook(element: Book): void {
    this.isLoading = true

    this.bookService.deleteBook(element.id)
      .pipe(
        take(1),
        tap(() => {
          this.getBooks()
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
  }

  onUpdateBook(element: Book): void {
    const ref = this.dialog.open(BookFormComponent, {
      data: element
    })

    ref.afterClosed()
      .pipe(
        take(1),
        map((book: Book) => {
          if (book) {
            return book as Book
          }

          return null as any
        }),
        switchMap((book: Book) => {
          if (book) {
            this.isLoading = true

            return this.bookService.updateBook(element.id, book)
              .pipe(
                tap(() => {
                  this.getBooks()
                })
              )
          }

          return of(null)
        })
      ).subscribe()
  }

  onCreateBook(): void {
    const ref = this.dialog.open(BookFormComponent)

    ref.afterClosed()
      .pipe(
        take(1),
        map((book: Book) => {
          if (book) {
            return book as Book
          }

          return null as any
        }),
        switchMap((book: Book) => {
          if (book) {
            this.isLoading = true

            return this.bookService.createBook(book)
              .pipe(
                tap(() => {
                  this.getBooks()
                })
              )
          }

          return of(null)
        })
      ).subscribe()
  }

  getBooks(): void {
    this.isLoading = true

    this.bookService.searchBooks(`title=${this.title.value}&author=${this.author.value}&genre=${this.genre.value}&page=${this.baseTableOptions.paginateOptions?.page}&size=${this.baseTableOptions.paginateOptions?.pageSize}`)
      .pipe(
        take(1),
        tap((res) => {
          if (res.data) {
            this.books.set(res.data)
            this.baseTableOptions = {
              ...this.baseTableOptions,
              paginateOptions: {
                ...this.baseTableOptions.paginateOptions,
                totalCount: res.totalCount,
              }
            }
          }
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
  }

  resetFilters(): void {
    this.title.setValue('')
    this.author.setValue('')
    this.genre.setValue('')
    this.getBooks()
  }
}
