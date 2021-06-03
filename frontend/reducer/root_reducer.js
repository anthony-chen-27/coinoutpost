import { combineReducers } from "redux";
import sessionReducer from "./session_reducer"
import entitiesReducer from './entities_reducer'
import errorsReducer from './errors_reducer'
import coinsReducer from './coins_reducer'
import priceReducer from './price_reducer'
import uiReducer from './ui_reducer'

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    coins: coinsReducer,
    prices: priceReducer,
    ui: uiReducer
})

export default rootReducer