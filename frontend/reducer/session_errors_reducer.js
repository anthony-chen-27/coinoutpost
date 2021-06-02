export default (state = [], action) => {
    switch(action.type) {
        case "RECEIVE_SESSION_ERRORS":
            return action.errors
        case "CLEAR_SESSION_ERRORS":
            return []
        case "RECEIVE_CURRENT_USER":
            return []
        default:
            return state
    }
}