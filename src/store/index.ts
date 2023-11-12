import { configureStore } from '@reduxjs/toolkit'

import persistanceLocalStorageMiddleware from './middlewares/persistanceLocalStorageMiddleware'

import authenticationReducer from './authentication/slice'
import cartItemsReducer from './cartItems/slice'
import usersReducer from './users/slice'
import categoriesReducer from './categories/slice'
import productsReducer from './products/slice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    cartItems: cartItemsReducer,
    users: usersReducer,
    categories: categoriesReducer,
    products: productsReducer
  },
  middleware: [persistanceLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
