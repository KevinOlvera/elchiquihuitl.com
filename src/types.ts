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

export interface Category {
  id: string
  name: string
  description: string
  status: keyof typeof Status
}
/// review below

export interface CartItem extends MenuItem {
  quantity: number
}

export type CartItemID = string

export interface CartItemWithID extends CartItem {
  id: CartItemID
}

export interface MenuCategory {
  id: string
  category: string
  description: string
  items: MenuItem[]
}
