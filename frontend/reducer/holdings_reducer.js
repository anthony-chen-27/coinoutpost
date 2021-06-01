const holdingsReducer = (state = {}, action) => {
    switch(action.type) {
        case "RECEIVE_HOLDINGS":
            return action.data
        default:
            return state
    }
}

export default holdingsReducer