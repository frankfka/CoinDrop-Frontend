import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from './constants/routes';

import Home from './components/Home/Home'
import PaymentProfilePage from './components/PaymentProfile/PaymentProfilePage'
import NewProfilePage from './components/NewProfile/NewProfilePage'
import InvalidPath from './components/InvalidPath/InvalidPath'
import CoinDropAppBar from "./components/Common/AppBar";

import { MuiThemeProvider } from '@material-ui/core/styles';
import appTheme from './components/AppTheme'

function App() {
  return (
    <div className="coindrop-app">
        <MuiThemeProvider theme={appTheme}>
            <CoinDropAppBar/>
            <Router>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={Home}/>
                    <Route exact path={ROUTES.NEW} component={NewProfilePage}/>
                    <Route path={ROUTES.PROFILE_ID_MATCH} component={PaymentProfilePage}/>
                    <Route component={InvalidPath}/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
