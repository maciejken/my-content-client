import React from 'react';
import './App.css';
import '@fontsource/roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SignIn from './features/sign-in/SignIn';
import SignUp from './features/sign-up/SignUp';

function Home() {
  return (
    <h1>Strona główna</h1>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
