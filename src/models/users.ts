import { type Company } from './company'

export interface CreateUser {
  name: string
  username: string
  email: string
  phone: string
  companyId: string
  password: string
}

export interface UpdateUser {
  name: string
  username: string
  email: string
  phone: string
  companyId: string
}

export interface User {
  id: string
  name: string
  username: string
  status: 'active' | 'inactive'
  company: Company
  companyId: string
  email: string
  phone: string
  role: 'admin' | 'owner' | 'assistant' | 'client'
  createdAt: string
  updatedAt: string
}

export interface AuthenticatedUser {
  token: string | null
  user: User | null
  iat: number | null
  exp: number | null
}
