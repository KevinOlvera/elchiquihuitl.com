import { type User } from '../models/users'
import { setItems, setPag, setPagPage } from '../store/users/slice'
import { type Pagination } from '../types'
import { useAppDispatch } from './store'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const setUsers = (users: User[]) => {
    dispatch(setItems(users))
  }

  const setPagination = (pagination: Pagination) => {
    dispatch(setPag(pagination))
  }

  const setCurrentPage = (page: number) => {
    dispatch(setPagPage(page))
  }

  return { setUsers, setPagination, setCurrentPage }
}
