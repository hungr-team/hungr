import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import MainPage from './pages/MainPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      {/* <Route path="/signup">
              <SignUp />
            </Route> */}
    </Switch>
  </Router>
);
export default App;
