export interface MenuItem {
  name: string
  description: string
  price: number
  image: string
}

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
