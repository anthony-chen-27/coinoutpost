export default (state = {id: null, lastUpdated: null}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case "RECEIVE_CURRENT_USER":
            return {id: action.user.id}
        case "LOGOUT_CURRENT_USER":
            return {id: null}
        case "UPDATE_SESSION":
            let nextState = Object.assign({}, state)
            nextState.lastUpdated = action.time
            return nextState
        default: 
            return state
    }
}