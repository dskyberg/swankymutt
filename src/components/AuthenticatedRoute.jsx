import React from 'react'
import { Route, Redirect } from 'react-router'

import authStore from '../stores/AuthStore'

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      authStore.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

export default AuthenticatedRoute