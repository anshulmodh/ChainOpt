import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import { AuthenticationProvider, oidcLog, InMemoryWebStorage } from '@axa-fr/react-oidc-context';
import oidcConfiguration from './configuration';
import NotAuthenticated from './shared/pages/NotAuthenticated';
import NotAuthorized from './shared/pages/NotAuthorized';
import Authenticating from './shared/pages/Authenticating';
import SessionLostComponent from './shared/pages/SessionLostComponent';
import callbackComponentOverride from './shared/pages/CallbackComponentOverride';
import { OidcSecure } from '@axa-fr/react-oidc-context';

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

// const ProtectedDashboard = withOidcSecure(LoggedInComponent);

function App() {
  return (
    <AuthenticationProvider
    configuration={oidcConfiguration}
    loggerLevel={oidcLog.DEBUG}
    isEnabled={true}
    UserStore={InMemoryWebStorage}
    notAuthenticated={NotAuthenticated}
    notAuthorized={NotAuthorized}
    authenticating={Authenticating}
    sessionLostComponent={SessionLostComponent}
    callbackComponentOverride={callbackComponentOverride}
  >
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/c">
                <OidcSecure>
                  <LoggedInComponent />
                </OidcSecure>
              </Route>
              <Route>
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

serviceWorker.register();

export default App;
