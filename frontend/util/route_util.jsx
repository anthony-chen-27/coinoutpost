import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const mSTP = (state) => {
    return {loggedIn: state.session.id !== null}
}


function Protected({ children, loggedIn, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          loggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}/>
          )
        }
      />
    );
}

function Auth({ children, loggedIn, ...rest}) {
    return (
        <Route
            {...rest}
            render={() =>
            !loggedIn ? (
                children
            ) : (
                <Redirect
                to={{
                    pathname: "/dashboard",
                }}/>
            )
            }
        />
    )
}

function Default({loggedIn}) {
    return (
        <Route
            render={() =>
            loggedIn ? (
                <Redirect
                to={{
                    pathname: "/dashboard",
                }} />
            ) : (
                <Redirect
                to={{
                    pathname: "/",
                }}/>
            )
            }
        />
    )
}

export const AuthRoute = withRouter(connect(mSTP)(Auth))
export const ProtectedRoute = withRouter(connect(mSTP)(Protected))
export const DefaultRoute = withRouter(connect(mSTP)(Default))