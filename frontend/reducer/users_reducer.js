export default (state = {}, action) => {
    switch (action.type) {
        case "RECEIVE_CURRENT_USER":
            return Object.assign({}, state, {[action.user.id]: action.user})
        case "RECEIVE_TRANSACTION":
            let nextState = Object.assign({}, state)
            let user = nextState[action.data.senderId] || nextState[action.data.receiverId]
            user.amount = user.amount + action.data.total
            return nextState
        default:
            return state
    }
}