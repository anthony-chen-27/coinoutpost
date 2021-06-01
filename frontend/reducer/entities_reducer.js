import { combineReducers } from "redux";
import userReducer from './users_reducer'
import holdingsReducer from './holdings_reducer'

const entitiesReducer = combineReducers({
    users: userReducer,
    holdings: holdingsReducer
})

export default entitiesReducer