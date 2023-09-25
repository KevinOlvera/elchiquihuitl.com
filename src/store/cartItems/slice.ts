import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type CartItem, type CartItemWithID } from '../../types'

const DEFAULT_STATE: CartItemWithID[] = [
  {
    id: '1',
    name: 'Hamburguesa sencilla',
    description: 'Deliciosa hamburguesa con carne de res 100% de primera calidad',
    price: 10.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 1
  },
  {
    id: '2',
    name: 'Hamburguesa doble',
    description: 'Deliciosa hamburguesa con doble carne de res 100% de primera calidad',
    price: 5.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/238e287aa4d92d6e0cc4783e397b6e7386cd2e47-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 5
  },
  {
    id: '6',
    name: 'Papas fritas',
    description: 'Deliciosas papas fritas',
    price: 5.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/fbf45e184fdb17a53d7568936911ec92c3928d69-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 5
  },
  {
    id: '7',
    name: 'Aros de cebolla',
    description: 'Deliciosos aros de cebolla',
    price: 5.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/3cbd7749633784fd04096cf4a12d500280663c02-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 1
  },
  {
    id: '13',
    name: 'Ensalada de atún',
    description: 'Deliciosa ensalada de atún',
    price: 10.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/ef0a13700b3beb3b3419834700383e14a5a57adb-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 1
  },
  {
    id: '14',
    name: 'Ensalada César',
    description: 'Deliciosa ensalada César',
    price: 10.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c30f8ed9889cc1579af7aee44d7812812c263305-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 1
  },
  {
    id: '15',
    name: 'Helado de vainilla',
    description: 'Delicioso helado de vainilla',
    price: 5.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/6e2dce514e8228f66b4931971d8428973ccbb410-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 1
  },

  {
    id: '17',
    name: 'Coca Cola',
    description: 'Deliciosa Coca Cola',
    price: 2.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c50b5e30f0afae6cea9ccdd8eeea069bed721ee9-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 6
  },
  {
    id: '20',
    name: 'Agua',
    description: 'Deliciosa agua',
    price: 1.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/0eb2b054a736c089011dba19ad43876ea34af761-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    quantity: 1
  }
]

const initialState: CartItemWithID[] = (() => {
  const persistedState = localStorage.getItem('_x_redux_CartItems')
  return (persistedState != null) ? JSON.parse(persistedState).cartItems : DEFAULT_STATE
})()

export const cartItemSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addNewCartItem: (state, action: PayloadAction<CartItem>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    }
  }
})

export default cartItemSlice.reducer

export const { addNewCartItem } = cartItemSlice.actions
