import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import { AuthOptions, BasicAuth } from '../../model';
import { authenticate } from '../../api/auth';

export const initialState = {
  expires: 0,
  error: '',
  loading: false,
  seconds: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthExpires: (state, action) => {
      state.expires = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthSeconds: (state, action) => {
      state.seconds = Math.floor(action.payload);
    },
  },
});

export const {
  setAuthExpires,
  setAuthError,
  setAuthLoading,
  setAuthSeconds,
} = authSlice.actions;

export const signIn = (basicAuth: BasicAuth) => (dispatch: AppDispatch) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const authOpts: AuthOptions = { apiUrl, basicAuth };
  dispatch(setAuthLoading(true));
  authenticate(authOpts)
    .then(response => {
      if (response.ok) {
        dispatch(setAuthExpires(response.data?.exp || 0));
      } else {
        const error = response.error?.message || `Unknown auth error`;
        dispatch(setAuthError(error));
      }
    })
    .catch(err => {
      dispatch(setAuthError(err));
    })
    .finally(() => {
      dispatch(setAuthLoading(false));
    });
}

export const selectAuthExpires = (state: RootState) => state.auth.expires;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthSeconds = (state: RootState) => state.auth.seconds;

export default authSlice.reducer;
