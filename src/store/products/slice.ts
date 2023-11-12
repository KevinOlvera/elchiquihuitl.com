import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Product } from '../../models/product'
import { type Pagination } from '../../types'

export interface ProductsState {
  items: Product[]
  pagination: Pagination
}

const DEFAULT_STATE: ProductsState = {
  items: [],
  pagination: {
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    totalPages: 1,
    totalRecords: 0
  }
}

const initialState = (() => {
  console.group('[productsSlice][initialState]')
  const persistedState = localStorage.getItem('_x_redux_elchiquihuitl')

  if (persistedState !== null) {
    const parsedPersistedState = JSON.parse(persistedState)
    if (parsedPersistedState.products !== undefined) {
      console.log('parsedPersistedState.products', parsedPersistedState.products)
      console.groupEnd()
      return parsedPersistedState.products
    }
  }

  console.log('DEFAULT_STATE', DEFAULT_STATE)
  console.groupEnd()
  return DEFAULT_STATE
})()

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      console.group('[productsSlice][setItems]')
      state.items = action.payload
      console.log('state', state.items)
      console.groupEnd()
      return state
    },
    setPag(state, action: PayloadAction<Pagination>) {
      console.group('[productsSlice][setPagination]')
      state.pagination = action.payload
      console.log('state', state.pagination)
      console.groupEnd()
      return state
    },
    setPagPage(state, action: PayloadAction<number>) {
      console.group('[productsSlice][setPagPage]')
      state.pagination.currentPage = action.payload
      console.log('state', state.pagination.currentPage)
      console.groupEnd()
      return state
    },
    clearProducts(state) {
      console.group('[productsSlice][setInitialState]')
      state = DEFAULT_STATE
      console.log('state', state)
      console.groupEnd()
      return state
    }
  }
})

export default productsSlice.reducer

export const { setItems, setPag, setPagPage, clearProducts } = productsSlice.actions
