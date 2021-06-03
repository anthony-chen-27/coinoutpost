const watchlistReducer = (state = {}, action) => {
    Object.freeze(state)
    let nextState = Object.assign({}, state)
    switch(action.type) {
        case "RECEIVE_WATCHLIST":
            return action.data
        case "RECEIVE_WATCH":
            nextState[action.data.cryptoId] = action.data
            return nextState
        case "REMOVE_WATCH":
            delete nextState[action.data.cryptoId]
            return nextState
        default:
            return state
    }
}

export default watchlistReducer