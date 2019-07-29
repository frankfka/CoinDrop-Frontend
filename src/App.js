import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import * as ROUTES from './constants/routes';

import Home from './components/Home/Home';
import PaymentProfilePage from './components/PaymentProfile/PaymentProfilePage';
import NewProfilePage from './components/NewProfile/NewProfilePage';
import CoinDropAppBar from './components/Common/AppBar';

import appTheme from './components/AppTheme';
import Footer from './components/Common/Footer';
import InvalidPage from './components/Common/InvalidPage';
import TermsPage from './components/Misc/TermsPage';

import './global.sass';

const useStyles = makeStyles(theme => ({
  appBody: {
    minHeight: '100vh',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="coindrop-app">
      <MuiThemeProvider theme={appTheme}>
        <Router>
          <CoinDropAppBar />
          <Container maxWidth="md" className={classes.appBody}>
            <Switch>
              <Route exact path={ROUTES.HOME} component={Home} />
              <Route exact path={ROUTES.NEW_PROFILE} component={NewProfilePage} />
              <Route exact path={ROUTES.TERMS} component={TermsPage} />
              <Route path={ROUTES.PROFILE_ID_MATCH} component={PaymentProfilePage} />
              <Route component={InvalidPage} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
