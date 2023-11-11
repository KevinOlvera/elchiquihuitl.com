import { useNavigate } from 'react-router-dom'
import { type AuthenticatedUser } from '../models/users'
import { setAuthenticated, setUnauthenticated } from '../store/authentication/slice'
import { clearCategories } from '../store/categories/slice'
import { clearProducts } from '../store/products/slice'
import { clearUsers } from '../store/users/slice'
import { useAppDispatch } from './store'

export const useAuthenticationActions = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const setAuthenticatedUser = (user: AuthenticatedUser) => {
    dispatch(setAuthenticated(user))
  }

  const setUnauthenticatedUser = () => {
    dispatch(setUnauthenticated())
    dispatch(clearCategories())
    dispatch(clearProducts())
    dispatch(clearUsers())
    navigate('/')
  }

  return { setAuthenticatedUser, setUnauthenticatedUser }
}
