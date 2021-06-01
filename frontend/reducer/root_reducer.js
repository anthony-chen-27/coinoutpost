import { combineReducers } from "redux";
import sessionReducer from "./session_reducer"
import entitiesReducer from './entities_reducer'
import errorsReducer from './errors_reducer'
import coinsReducer from './coins_reducer'

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    coins: coinsReducer
})

export default rootReducer