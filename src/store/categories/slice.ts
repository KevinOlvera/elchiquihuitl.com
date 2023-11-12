import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Category } from '../../models/category'
import { type Pagination } from '../../types'

export interface CategoriesState {
  items: Category[]
  pagination: Pagination
}

const DEFAULT_STATE: CategoriesState = {
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
  console.group('[categoriesSlice][initialState]')
  const persistedState = localStorage.getItem('_x_redux_elchiquihuitl')

  if (persistedState !== null) {
    const parsedPersistedState = JSON.parse(persistedState)
    if (parsedPersistedState.categories !== undefined) {
      console.log('parsedPersistedState.categories', parsedPersistedState.categories)
      console.groupEnd()
      return parsedPersistedState.categories
    }
  }

  console.log('DEFAULT_STATE', DEFAULT_STATE)
  console.groupEnd()
  return DEFAULT_STATE
})()

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Category[]>) {
      console.group('[categoriesSlice][setItems]')
      state.items = action.payload
      console.log('state', state.items)
      console.groupEnd()
      return state
    },
    setPag(state, action: PayloadAction<Pagination>) {
      console.group('[categoriesSlice][setPagination]')
      state.pagination = action.payload
      console.log('state', state.pagination)
      console.groupEnd()
      return state
    },
    setPagPage(state, action: PayloadAction<number>) {
      console.group('[categoriesSlice][setPagPage]')
      state.pagination.currentPage = action.payload
      console.log('state', state.pagination.currentPage)
      console.groupEnd()
      return state
    },
    clearCategories(state) {
      console.group('[categoriesSlice][clearCategories]')
      state = DEFAULT_STATE
      console.log('state', state)
      console.groupEnd()
      return state
    }
  }
})

export default categoriesSlice.reducer

export const { setItems, setPag, setPagPage, clearCategories } = categoriesSlice.actions
