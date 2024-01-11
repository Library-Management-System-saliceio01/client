import { Book } from "./book.interface"
import { UserBorrowBook } from "./user-borrow-book.interface"
import { User } from "./user.interface"

export interface LibrarianAnalytics {
  countBooks: number
  userBorrowedBooks: number
  booksBorrowedExpiratedToday: Book[]
  usersWithBooksBorrowedExpirated: User[]
}

export interface UserAnalytics {
  booksBorrowedByUser: UserBorrowBook[]
  overDueBooksByUser: UserBorrowBook[]
}
