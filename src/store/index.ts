import { configureStore, type Middleware } from '@reduxjs/toolkit'

import cartItemsReducer from './cartItems/slice'

const persistanceLocalStorageMiddleware: Middleware =
    (store) => (next) => (action) => {
      next(action)
      localStorage.setItem(
        '_x_redux_CartItems',
        JSON.stringify(store.getState())
      )
    }

export const store = configureStore({
  reducer: {
    cartItems: cartItemsReducer
  },
  middleware: [persistanceLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
