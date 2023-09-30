import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type MenuItem, type CartItem } from '../../types'

const DEFAULT_STATE: CartItem[] = []

const initialState: CartItem[] = (() => {
  const persistedState = localStorage.getItem('_x_redux_CartItems')
  return (persistedState != null) ? JSON.parse(persistedState).cartItems : DEFAULT_STATE
})()

export const cartItemSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index === -1) {
        state.push({ ...action.payload, quantity: 1 })
      } else {
        state[index].quantity += 1
      }
    },
    subItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        if (state[index].quantity === 1) {
          state.splice(index, 1)
        } else {
          state[index].quantity -= 1
        }
      }
    },
    removeItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }
  }
})

export default cartItemSlice.reducer

export const { addItem, subItem, removeItem } = cartItemSlice.actions
