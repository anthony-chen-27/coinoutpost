import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './app'


// Wraps the main app.jsx in a hashrouter so that routes in app.jsx can work
// Provider provides react-redux functionalities to components
const Root = ({store}) => (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)

export default Root