import { Book } from "../../interfaces/book.interface";
import { IColumns } from "../../ui/interfaces";

export const bookColumns: IColumns<Book>[] = [
  {
    caption: 'Title',
    field: {
      key: 'title',
    },
  },
  {
    caption: 'Author',
    field: {
      key: 'author',
    },
  },
  {
    caption: 'Genre',
    field: {
      key: 'genre',
    },
  },
  {
    caption: 'Total Copies',
    field: {
      key: 'totalCopies',
    },
  },
  {
    caption: 'Is Borrowed',
    field: {
      key: 'isBorrowed',
    },
  },
  {
    caption: 'Created At',
    field: {
      key: 'createdAt',
    },
  },
  {
    caption: 'Updated At',
    field: {
      key: 'updatedAt',
    },
  },
]
