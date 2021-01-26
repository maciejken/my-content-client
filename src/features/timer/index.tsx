import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { initialState, setAuthExpires, setAuthorized } from '../auth/authSlice';
import Timer from './Timer';

const mapStateToProps = (state: RootState) => ({
  expires: state.auth.expires
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signOut: () => {
    dispatch(setAuthorized(false));
    dispatch(setAuthExpires(initialState.expires));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
