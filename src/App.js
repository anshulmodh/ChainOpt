import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import { AuthProvider } from 'oidc-react';

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

// const oidcConfig = {
//   onSignIn: () => {
//     setTimeout(() => {
//       history.push("/c/models");
//     }, 150);
//   },
//   authority: 'https://oidc.io/oauth',
//   clientId: 'this-is-a-client-id',
//   redirectUri: 'https://my-app.com/'
// };


function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route path="/c">
              <LoggedInComponent />
            </Route>
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
