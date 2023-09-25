import { addNewCartItem } from '../store/cartItems/slice'
import { type CartItem } from '../types'
import { useAppDispatch } from './store'

export const useCartItemActions = () => {
  const dispatch = useAppDispatch()

  const addCartItem = ({ name, description, price, image, quantity }: CartItem) => {
    dispatch(addNewCartItem({ name, description, price, image, quantity }))
  }

  return { addCartItem }
}
