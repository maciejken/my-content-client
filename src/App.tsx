import React, { useEffect } from 'react';
import './App.css';
import '@fontsource/roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Navbar from './features/navbar/Navbar';
import SignIn from './features/auth';
import SignUp from './features/registration/SignUp';
import ImageGallery from './features/image-gallery/ImageGallery';
import { Cookies } from 'react-cookie';

function Home () {
  return <ImageGallery>Galeria</ImageGallery>;
}

export interface AppProps {
  cookies?: Cookies,
  isAuthorized: boolean;
  signIn: (expires: number) => void;
}

function App (props: AppProps) {
  const { isAuthorized, cookies, signIn } = props;

  useEffect(() => {
    const authExpiresCookie = cookies?.get('authExpires');
    if (authExpiresCookie) {
      const authExpires = parseInt(authExpiresCookie);
      signIn(authExpires);
    }
  }, [signIn, cookies]);

  return (
    <>
      {isAuthorized ? <Navbar /> : null }
      <React.StrictMode>
        <Router>
          <Switch>
            <Route path="/sign-in">
              {isAuthorized ? <Redirect to="/" /> : <SignIn />}
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/">
              {isAuthorized ? <Home /> : <Redirect to="sign-in" />}
            </Route>
          </Switch>
        </Router>
      </React.StrictMode>
    </>
  );
}

export default App;
