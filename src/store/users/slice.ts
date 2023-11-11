import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type User } from '../../models/users'
import { type Pagination } from '../../types'

export interface UsersState {
  items: User[]
  pagination: Pagination
}

const DEFAULT_STATE: UsersState = {
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
  console.group('[usersSlice][initialState]')
  const persistedState = localStorage.getItem('_x_redux_elchiquihuitl')

  if (persistedState !== null) {
    const parsedPersistedState = JSON.parse(persistedState)
    if (parsedPersistedState.users !== undefined) {
      console.log('parsedPersistedState.users', parsedPersistedState.users)
      console.groupEnd()
      return parsedPersistedState.users
    }
  }

  console.log('DEFAULT_STATE', DEFAULT_STATE)
  console.groupEnd()
  return DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<User[]>) {
      console.group('[usersSlice][setItems]')
      state.items = action.payload
      console.log('state', state.items)
      console.groupEnd()
      return state
    },
    setPag(state, action: PayloadAction<Pagination>) {
      console.group('[usersSlice][setPagination]')
      state.pagination = action.payload
      console.log('state', state.pagination)
      console.groupEnd()
      return state
    },
    setPagPage(state, action: PayloadAction<number>) {
      console.group('[usersSlice][setPagPage]')
      state.pagination.currentPage = action.payload
      console.log('state', state.pagination.currentPage)
      console.groupEnd()
      return state
    },
    clearUsers(state) {
      console.group('[usersSlice][setInitialState]')
      state = DEFAULT_STATE
      console.log('state', state)
      console.groupEnd()
      return state
    }
  }
})

export default usersSlice.reducer

export const { setItems, setPag, setPagPage, clearUsers } = usersSlice.actions
