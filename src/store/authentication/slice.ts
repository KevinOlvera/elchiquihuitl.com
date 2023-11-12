import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type AuthenticatedUser } from '../../models/users'

const DEFAULT_STATE: AuthenticatedUser = {
  token: null,
  user: null,
  iat: null,
  exp: null
}

const initialState = (() => {
  console.group('[authenticationSlice][initialState]')
  const persistedState = localStorage.getItem('_x_redux_elchiquihuitl')

  if (persistedState !== null) {
    const parsedPersistedState = JSON.parse(persistedState)
    if (parsedPersistedState.authentication !== undefined) {
      console.log('parsedPersistedState.authentication', parsedPersistedState.authentication)
      console.groupEnd()
      return parsedPersistedState.authentication
    }
  }

  console.log('DEFAULT_STATE', DEFAULT_STATE)
  console.groupEnd()
  return DEFAULT_STATE
})()

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<AuthenticatedUser>) => {
      console.group('[authenticationSlice][setAuthenticated]')
      state = action.payload
      console.log('state', state)
      console.groupEnd()
      return state
    },
    setUnauthenticated: (state) => {
      console.group('[authenticationSlice][setUnauthenticated]')
      state = DEFAULT_STATE
      console.log('state', state)
      console.groupEnd()
      return state
    }
  }
})

export default authenticationSlice.reducer

export const { setAuthenticated, setUnauthenticated } = authenticationSlice.actions
