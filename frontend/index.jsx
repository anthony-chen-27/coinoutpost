import React from 'react'
import ReactDOM from 'react-dom'
import ConfigureStore from './store/store'


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')
    const store = ConfigureStore()
    window.store = store
    ReactDOM.render(<h3>Hello</h3>, root)
})