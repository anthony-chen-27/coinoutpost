import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import Root from './component/root'
import * as test from './action/watchlist_action'
import * as test2 from './action/price_action'
import * as test3 from './action/transaction_action'

// Current user bootstrapped through preloaded state so that refreshing the page does not cause a user to be logged out
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')
    window.test = test
    window.test2 = test2
    window.test3 = test3
    let store
    if (window.currentUser) {
        const preloadedState = {
            entities: {
            users: { [window.currentUser.id]: window.currentUser }
            },
            coins: window.coins,
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState)
        delete window.currentUser
        delete window.coins
    } else {
        const preloadedState = {
            coins: window.coins
        }
        store = configureStore(preloadedState)
        delete window.coins
    }
    window.store = store
    ReactDOM.render(<Root store={store} />, root)
})