import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import BlockedPage from './pages/BlockedPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/favorites' component={FavoritesPage} />
      <Route path='/blocks' component={BlockedPage} />
      <Route path='/signUp' component={SignUp} />
      <Route path='/signIn' component={SignIn} />
      {/* <Route path="/signup">
              <SignUp />
            </Route> */}
      {/* <Route exact path='/'>
        <MainPage />
      </Route>
      <Route path='/signUp'>
        <SignUp />
      </Route>
      <Route path='/signIn'>
        <SignIn />
      </Route> */}
    </Switch>
  </Router>
);
export default App;
