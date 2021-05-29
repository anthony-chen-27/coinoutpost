export default (state = {}, action) => {
    switch(action.type) {
        case "RECEIVE_CURRENT_USER":
            return action.user
        case "LOGOUT_CURRENT_USER":
            return {id: null}
        default: 
            return state
    }
}