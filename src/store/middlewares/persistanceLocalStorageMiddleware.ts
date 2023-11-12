import { type Middleware } from '@reduxjs/toolkit'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('_x_redux_elchiquihuitl', JSON.stringify(store.getState()))
}

export default persistanceLocalStorageMiddleware
