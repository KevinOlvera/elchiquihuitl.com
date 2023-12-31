import { addItem, removeItem, subItem } from '../store/cartItems/slice'
import { type MenuItem } from '../types'
import { useAppDispatch } from './store'

export const useCartItemActions = () => {
  const dispatch = useAppDispatch()

  const addCartItem = (item: MenuItem) => {
    dispatch(addItem(item))
  }

  const subCartItem = (item: MenuItem) => {
    dispatch(subItem(item))
  }

  const removeCartItem = (item: MenuItem) => {
    dispatch(removeItem(item))
  }

  return { addCartItem, subCartItem, removeCartItem }
}
