import React from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import Authtest from './session/auth_test'
import Login from './session/login'
import Signup from './session/signup'


const App = () => {
    return (
        <div>
            <h1>CoinOutpost</h1>
            <Authtest />
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
            <Switch>

            </Switch>
        </div>
    )
}

export default App