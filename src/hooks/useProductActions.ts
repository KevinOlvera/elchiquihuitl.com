import { type Product } from '../models/product'
import { setItems, setPag, setPagPage } from '../store/products/slice'
import { type Pagination } from '../types'
import { useAppDispatch } from './store'

export const useProductActions = () => {
  const dispatch = useAppDispatch()

  const setProducts = (product: Product[]) => {
    dispatch(setItems(product))
  }

  const setPagination = (pagination: Pagination) => {
    dispatch(setPag(pagination))
  }

  const setCurrentPage = (page: number) => {
    dispatch(setPagPage(page))
  }

  return { setProducts, setPagination, setCurrentPage }
}
