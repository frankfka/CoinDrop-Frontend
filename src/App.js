import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from './constants/routes';

import Home from './components/Home/Home'
import PaymentProfile from './components/PaymentProfile/PaymentProfile'
import NewProfile from './components/NewProfile/NewProfile'
import InvalidPath from './components/InvalidPath/InvalidPath'

function App() {
  return (
    <div className="coindrop-app">
        <Router>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Home}/>
                <Route exact path={ROUTES.NEW} component={NewProfile}/>
                <Route path={ROUTES.PROFILE} component={PaymentProfile}/>
                <Route component={InvalidPath}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
