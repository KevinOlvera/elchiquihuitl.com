import { type Category } from './category'
import { type Company } from './company'

export interface CreateProduct {
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  time: number
  calories: number
  companyId: string
}

export interface UpdateProduct {
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  time: number
  calories: number
  companyId: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  time: number
  rating: number
  calories: number
  status: 'available' | 'unavailable'
  companyId: string
  category: Category
  company: Company
}
