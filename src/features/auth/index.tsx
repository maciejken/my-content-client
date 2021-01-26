import { connect } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { BasicAuth } from '../../model';
import { authenticate } from './authSlice';
import SignIn from './SignIn';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  authenticate: (basicAuth: BasicAuth) => {
    dispatch(authenticate(basicAuth));
  }
});

export default connect(null, mapDispatchToProps)(SignIn);
