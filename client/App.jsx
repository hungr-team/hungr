import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <MainPage />
      </Route>
      <Route path='/signUp'>
        <SignUp />
      </Route>
      <Route path='/signIn'>
        <SignIn />
      </Route>
    </Switch>
  </Router>
);
export default App;
