import React from 'react'
import { Route } from 'react-router'
import PrivateRoute from './components/AuthenticatedRoute'

import IndexPage from './pages/IndexPage'
import AboutPage from './pages/AboutPage'
import NoMatchPage from './pages/NoMatchPage'
import LoginPage from './pages/auth/LoginPage'
import LogoutPage from './pages/auth/LogoutPage'


const routes = [{
        path: "/",
        title: "Home",
        icon: "home",
        exact: true,
        component: IndexPage,
        drawer: true,
        authenticated: false,
    },
    {
        path: "/about",
        title: "About",
        icon: "star",
        component: AboutPage,
        drawer: true,
        authenticated: false,
    },
    {
        path: "/login",
        component: LoginPage,
        drawer: false,
        authenticated: false,
    },
    {
        path: "/logout",
        component: LogoutPage,
        drawer: false,
        authenticated: false,
    },
    {
        component: NoMatchPage,
        drawer: false,
        authenticated: false,
    },
]

export function createRoute(route, idx) {
    const {authenticated, drawer, icon, ...other} = route
    if(authenticated && authenticated === true) {
        return <PrivateRoute key={idx} {...other} />
    } else {
        return <Route key={idx} {...other} />
    }
}

    export default routes