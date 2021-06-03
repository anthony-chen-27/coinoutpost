import { combineReducers } from "redux";

const currentReducer = (state = {}, action) => {
    switch(action.type) {
        case "RECEIVE_CURRENT_PRICE":
            return action.data
        default:
            return state
    }
}

const priceHistoryReducer = (state = {}, action) => {
    switch(action.type) {
        case "RECEIVE_DAY_PRICE":
            return Object.assign({}, state, {[action.coin.name]: action.data})
        default:
            return state
    }
}


const priceReducer = combineReducers({
    current: currentReducer, 
    day: priceHistoryReducer 
})

export default priceReducer