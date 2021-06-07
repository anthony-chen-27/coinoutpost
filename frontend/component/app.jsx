import React from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import Splash from './splash/splash'
import Login from './session/login'
import Signup from './session/signup'
import {AuthRoute, ProtectedRoute, DefaultRoute} from '../util/route_util'
import Dashboard from './main/dashboard'
import Holdings from './main/holdings'
import Trade from './main/trade'
import { connect } from 'react-redux'
import Sidebar from './sidebar/sidebar'
import Mainheader from './header/main_header'
import './app.css'

const mSTP = ({session, entities: {users}}) => {
    return {
        loggedIn: session.id !== null,
        currentUser: users[session.id],
    }
}

// In addition to the default Route provided by react-router, 3 more are provided below
// AuthRoute, used for routes that can only be accessed when logged out
// ProtectedRoute, used for routes that can only be accessed when logged in
// DefaultRoute, wildcard route, covers invalid routes, redirects to splash page when not logged in and directs to dashboard when logged in.
    //TODO Probably replace this wildcard route with a 404 component with a button to return to splash or dashboard just like how coinbase does it
const App = ({currentUser, loggedIn}) => {
    return (
        <div className='main'>
            {loggedIn ? <Sidebar /> : null}
            {loggedIn ? <Mainheader /> : null}
            <div className={loggedIn ? 'main_content' : 'splash'}>
                <Switch>
                    <AuthRoute exact path='/'> <Splash /> </AuthRoute>
                    <AuthRoute path='/login'> <Login /> </AuthRoute>
                    <AuthRoute path='/signup'> <Signup /> </AuthRoute>
                    <ProtectedRoute exact path='/dashboard'> <Dashboard /> </ProtectedRoute>
                    <ProtectedRoute exact path='/holdings'> <Holdings user={currentUser}/> </ProtectedRoute>
                    <ProtectedRoute exact path='/trade'> <Trade user={currentUser}/> </ProtectedRoute>
                    <DefaultRoute path="*" />
                </Switch>
            </div>
        </div>
    )
}

export default connect(mSTP)(App)