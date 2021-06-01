import { combineReducers } from "redux";

const currentReducer = (state = {}, action) => {
    switch(action.type) {
        case "RECEIVE_CURRENT_PRICE":
            return action.data
        default:
            return state
    }
}


const priceReducer = combineReducers({
    current: currentReducer, 
})

export default priceReducer