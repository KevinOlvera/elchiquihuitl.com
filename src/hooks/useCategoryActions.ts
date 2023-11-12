import { type Category } from '../models/category'
import { setItems, setPag, setPagPage } from '../store/categories/slice'
import { type Pagination } from '../types'
import { useAppDispatch } from './store'

export const useCategoryActions = () => {
  const dispatch = useAppDispatch()

  const setCategories = (users: Category[]) => {
    dispatch(setItems(users))
  }

  const setPagination = (pagination: Pagination) => {
    dispatch(setPag(pagination))
  }

  const setCurrentPage = (page: number) => {
    dispatch(setPagPage(page))
  }

  return { setCategories, setPagination, setCurrentPage }
}
