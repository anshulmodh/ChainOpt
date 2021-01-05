import React, { Fragment, Suspense, lazy, useState } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import Amplify, { Auth, Hub, API } from 'aws-amplify'
import awsconfig from './awsconfig'
import awsauth from './awsauth'

Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth })

const currentConfig = Auth.configure(); // to get current config object

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
  const [user, setUser] = useState(null)

  Hub.listen('auth', ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        console.log('sign in', event, data)
        setUser(data)
        break
      case 'signOut':
        console.log('sign out')
        setUser(null)
        break
    }
  })

  function requireAuth(nextState, replace, next) {
    Auth.currentAuthenticatedUser().then(cur => {
        console.log('currentAuthenticatedUser', cur)
        setUser(cur)
      }).catch(() => {
        signIn();
      })
  }
  
  function signIn() {
    Auth.federatedSignIn().then(cred => {
        // If success, you will get the AWS credentials
        console.log(cred);
        return Auth.currentAuthenticatedUser();
    }).then(user => {
        // If success, the user object you passed in Auth.federatedSignIn
        console.log(user);
    }).catch(e => {
        console.log(e)
    });
  }

  return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/c" render={() => {
                if(!user) {
                  requireAuth()
                }
                return (
                    <LoggedInComponent user={user}/>
                  )
              }}/>
              <Route>
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </BrowserRouter>
  );
}

serviceWorker.register();

export default App;
