export interface IBaseTable<T> {
  dataSource: T[]
  columns: IColumns<T>[]
  actions?: ITableActions<T>[]
  paginateOptions?: IPaginationOptions
}

export interface ITableActions<T> {
  icon: string
  name: string
  element?: T
  role?: string[]
  hide: (element: T) => boolean
  action: (element: T) => void
}

export interface IColumns<T> {
  caption: string
  field: IField<T>
}

interface IField<T> {
  key: string
  parseElement?: (element: T) => string | number
}

export interface IPaginationOptions {
  totalCount?: number
  pageSize?: number
  pageSizeOptions?: number[]
  page?: number
}
