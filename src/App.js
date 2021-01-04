import React, { Fragment, Suspense, lazy, useState } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
// import { AuthenticationProvider, oidcLog, InMemoryWebStorage } from '@axa-fr/react-oidc-context';
// import oidcConfiguration from './configuration';
// import NotAuthenticated from './shared/pages/NotAuthenticated';
// import NotAuthorized from './shared/pages/NotAuthorized';
// import Authenticating from './shared/pages/Authenticating';
// import SessionLostComponent from './shared/pages/SessionLostComponent';
// import callbackComponentOverride from './shared/pages/CallbackComponentOverride';
// import { OidcSecure } from '@axa-fr/react-oidc-context';
// import Amplify, { Auth } from 'aws-amplify';
// import awsconfig from './awsconfig';
import Amplify, { Auth, Hub, API } from 'aws-amplify'
import awsconfig from './awsconfig'
import awsauth from './awsauth'

Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth })

const currentConfig = Auth.configure(); // to get current config object

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

// const ProtectedDashboard = withOidcSecure(LoggedInComponent);

function App() {
  const [user, setUser] = useState(null)
  console.log("here")

  Hub.listen('auth', ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        console.log('sign in', event, data)
        setUser(data)
        // this.setState({ user: data})
        break
      case 'signOut':
        console.log('sign out')
        setUser(null)
        // this.setState({ user: null })
        break
    }
  })

  function requireAuth(nextState, replace, next) {
    console.log("force sign in")
    Auth.currentAuthenticatedUser().then(cur => {
        console.log('currentAuthenticatedUser', cur)
        setUser(cur)
      }).catch(() => {
        signIn();
      })
      // next()
  }
  
  function signIn() {
    // console.log("force sign in")
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
  //   <AuthenticationProvider
  //   configuration={oidcConfiguration}
  //   loggerLevel={oidcLog.DEBUG}
  //   isEnabled={true}
  //   UserStore={InMemoryWebStorage}
  //   notAuthenticated={NotAuthenticated}
  //   notAuthorized={NotAuthorized}
  //   authenticating={Authenticating}
  //   sessionLostComponent={SessionLostComponent}
  //   callbackComponentOverride={callbackComponentOverride}
  // >
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
                    <LoggedInComponent user={user} setUser={setUser}/>
                  )
              }}/>
                {/* //   isLoggedIn() ? (
                //     <LoggedInComponent user={user}/>
                //   ) : (
                //     <Home />
                //   )
                // )}/> */}
                {/* <OidcSecure> */}
                  {/* <LoggedInComponent user={user}/> */}
                {/* </OidcSecure> */}
              <Route>
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </BrowserRouter>
    // </AuthenticationProvider>
  );
}

serviceWorker.register();

export default App;
