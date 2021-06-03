const uiReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case "UPDATE_UI":
            return {loading: action.loading}
        default:
            return state
    }
}

export default uiReducer