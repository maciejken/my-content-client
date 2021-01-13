import React, { useEffect } from 'react';
import './App.css';
import '@fontsource/roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withCookies, ReactCookieProps } from 'react-cookie';
import Navbar from './features/navbar/Navbar';
import SignIn from './features/auth/SignIn';
import SignUp from './features/registration/SignUp';
import ImageGallery from './features/image-gallery/ImageGallery';
import { selectAuthExpires, setAuthExpires } from './features/auth/authSlice';

function Home() {
  return <ImageGallery>Galeria</ImageGallery>;
}

function App(props: ReactCookieProps) {

  const dispatch = useDispatch();
  const authExpires = useSelector(selectAuthExpires);
  const authExpiresCookie = props?.cookies?.get('authExpiration');

  useEffect(() => {
    if (authExpiresCookie) {
      const expires = parseInt(authExpiresCookie);
      dispatch(setAuthExpires(expires));
    }
  }, [authExpiresCookie, dispatch]);

  return (
    <div>
      {authExpires ? <Navbar /> : null }
      <Router>
        <Switch>
          <Route path="/sign-in">
            {authExpires ? <Redirect to="/" /> : <SignIn />}
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/">
            {authExpires ? <Home /> : <Redirect to="sign-in" />}
          </Route>
        </Switch>
      </Router>      
    </div>
  );
}

export default withCookies(App);
