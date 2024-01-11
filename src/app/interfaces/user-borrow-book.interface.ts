import { Book } from "./book.interface"
import { User } from "./user.interface"

export interface UserBorrowBook {
  id: string
  returned: boolean
  expirationDate: Date
  user: User
  book: Book
  createdAt: Date
  updatedAt: Date
}
