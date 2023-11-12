export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  time?: number
}

export enum Status {
  available = 'available',
  unavailable = 'unavailable'
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Coupon {
  id: string
  title: string
  description: string
  code: string
  image: string
  terms: string
  expiration: string
}

export interface Pagination {
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  totalPages: number
  totalRecords: number
}
