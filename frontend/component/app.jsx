import React from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import Splash from './main/splash'
import Login from './session/login'
import Signup from './session/signup'
import {AuthRoute, ProtectedRoute, DefaultRoute} from '../util/route_util'
import Dashboard from './main/dashboard'



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