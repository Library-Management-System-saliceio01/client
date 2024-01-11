export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  totalCopies: number;
  isBorrowed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  totalCopies: number;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  totalCopies?: number;
  isBorrowed?: boolean;
}
