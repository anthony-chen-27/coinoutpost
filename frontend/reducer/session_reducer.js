export default (state = {id: null}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case "RECEIVE_CURRENT_USER":
            return {id: action.user.id}
        case "LOGOUT_CURRENT_USER":
            return {id: null}
        default: 
            return state
    }
}