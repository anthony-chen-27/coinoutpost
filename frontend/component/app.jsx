import React from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import Authtest from './session/auth_test'
import Login from './session/login'
import Signup from './session/signup'
import {AuthRoute, ProtectedRoute, DefaultRoute} from '../util/route_util'
import Dashboard from './dashboard'



const App = () => {
    return (
        <div>
            <h1>CoinOutpost</h1>
            
            <Switch>
                <AuthRoute exact path='/'> <Authtest /> </AuthRoute>
                <AuthRoute path='/login'> <Login /> </AuthRoute>
                <AuthRoute path='/signup'> <Signup /> </AuthRoute>
                <ProtectedRoute path='/dashboard'> <Dashboard /> </ProtectedRoute>
                <DefaultRoute path="*" />
            </Switch>
        </div>
    )
}

export default App