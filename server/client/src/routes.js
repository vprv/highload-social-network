import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AccountScreen, AuthScreen, RegistrationScreen } from "./screens";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>

        <Route path="/account/:email">
          <AccountScreen />
        </Route>
        <Route path="/account/">
          <AccountScreen />
        </Route>
        <Redirect to="/account" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthScreen />
      </Route>

      <Route path="/registration" exact>
        <RegistrationScreen />
      </Route>


    </Switch>
  )
}