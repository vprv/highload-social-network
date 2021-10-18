import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AccountScreen, AuthScreen, RegistrationScreen } from "./screens";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/account" exact>
          <AccountScreen />
        </Route>
        <Redirect to="/account" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <RegistrationScreen />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}