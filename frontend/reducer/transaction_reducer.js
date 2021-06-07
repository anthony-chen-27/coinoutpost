const TransactionReducer = (state = {}, action) => {
    switch (action.type) {
        case "RECEIVE_TRANSACTIONS":
            return Object.assign({}, state, action.data)
        case "RECEIVE_TRANSACTION":
            return Object.assign({}, state, {[action.data.id]: action.data})
        default:
            return state
    }
}

export default TransactionReducer