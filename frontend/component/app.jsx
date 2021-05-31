import React from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import Splash from './main/splash'
import Login from './session/login'
import Signup from './session/signup'
import {AuthRoute, ProtectedRoute, DefaultRoute} from '../util/route_util'
import Dashboard from './main/dashboard'




// In addition to the default Route provided by react-router, 3 more are provided below
// AuthRoute, used for routes that can only be accessed when logged out
// ProtectedRoute, used for routes that can only be access when logged in
// DefaultRoute, wildcard route, covers invalid routes, redirects to splash page when not logged in and directs to dashboard when logged in.
    //TODO Probably replace this wildcard route with a 404 component with a button to return to splash or dashboard just like how coinbase does it
const App = () => {
    return (
        <div>
            <Link to='/'><h1>CoinOutpost</h1></Link>
            
            <Switch>
                <AuthRoute exact path='/'> <Splash /> </AuthRoute>
                <AuthRoute path='/login'> <Login /> </AuthRoute>
                <AuthRoute path='/signup'> <Signup /> </AuthRoute>
                <ProtectedRoute path='/dashboard'> <Dashboard /> </ProtectedRoute>

                <DefaultRoute path="*" />
            </Switch>
        </div>
    )
}

export default App