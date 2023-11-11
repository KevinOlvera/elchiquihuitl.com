import axios from 'axios'
import { toast } from 'sonner'
import { store } from '../../store'

// const API_URL = 'https://api-kevinolvera-com-dev.fl0.io'
const API_URL = 'http://localhost:8080'
export const USERS_ENDPOINT = '/api/users'
export const COMPANIES_ENDPOINT = '/api/companies'
export const CATEGORIES_ENDPOINT = '/api/categories'
export const PRODUCTS_ENDPOINT = '/api/products'
export const LOGIN_ENDPOINT = '/api/login'

export const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(
  (config) => {
    const token = store.getState().authentication.token
    if (token !== null || token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

export async function toastWrapper (promise: Promise<any>) {
  const toastId = toast.loading('Cargando...')
  const result = await promise
    .then((response) => {
      toast.success(response.data.message, {
        id: toastId
      })
      return response
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          id: toastId
        })
      }
      throw error
    })
  return result
}
