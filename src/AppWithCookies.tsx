import { connect } from 'react-redux';
import { ReactCookieProps, withCookies } from 'react-cookie';
import App from './App';
import { AppDispatch, RootState } from './app/store';
import { setAuthExpires, setAuthorized } from './features/auth/authSlice';

const mapStateToProps = (state: RootState, ownProps: ReactCookieProps) => ({
  cookies: ownProps?.cookies,
  isAuthorized: state.auth.authorized
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signIn: (expires: number) => {
    dispatch(setAuthExpires(expires));
    dispatch(setAuthorized(true));
  }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default withCookies(AppContainer);
