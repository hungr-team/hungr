import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import BlockedPage from './pages/BlockedPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/favorites' component={FavoritesPage} />
      <Route path='/blocks' component={BlockedPage} />
      {/* <Route path="/signup">
              <SignUp />
            </Route> */}
    </Switch>
  </Router>
);
export default App;
