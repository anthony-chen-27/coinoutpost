import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import Root from './component/root'
import * as test from './action/session_action'


// Current user bootstrapped through preloaded state so that refreshing the page does not cause a user to be logged out
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')
    window.test = test
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
            users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    window.store = store
    ReactDOM.render(<Root store={store} />, root)
})