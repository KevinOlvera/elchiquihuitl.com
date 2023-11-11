export interface CreateCategory {
  name: string
  description: string
  companyId: string
}

export interface UpdateCategory {
  name: string
  description: string
  companyId: string
}

export interface Category {
  id: string
  name: string
  description: string
  status: 'available' | 'unavailable'
  companyId: string
  products: []
}
