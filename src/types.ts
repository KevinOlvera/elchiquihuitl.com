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

export interface CartItem extends MenuItem {
  quantity: number
}
