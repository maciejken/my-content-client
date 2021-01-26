import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../../app/store'
import { AuthOptions, BasicAuth } from '../../model'
import * as authApi from '../../api/auth'

export const initialState = {
  expires: 0,
  error: '',
  authorized: false,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthExpires: (state, action) => {
      state.expires = action.payload
    },
    setAuthError: (state, action) => {
      state.error = action.payload
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload
    },
    setAuthorized: (state, action) => {
      state.authorized = action.payload
    }
  }
})

export const {
  setAuthExpires,
  setAuthError,
  setAuthLoading,
  setAuthorized
} = authSlice.actions

export const authenticate = (basicAuth: BasicAuth) => (dispatch: AppDispatch) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const authOpts: AuthOptions = { apiUrl, basicAuth }
  dispatch(setAuthLoading(true))
  authApi.authenticate(authOpts)
    .then(response => {
      if (response.ok) {
        dispatch(setAuthorized(true))
        dispatch(setAuthExpires(response?.data?.expires))
      } else {
        const error = response?.error || response?.error?.message || 'Unknown auth error'
        dispatch(setAuthError(error))
      }
    })
    .catch(err => {
      dispatch(setAuthError(err.message))
    })
    .finally(() => {
      dispatch(setAuthLoading(false))
    })
}

export default authSlice.reducer
