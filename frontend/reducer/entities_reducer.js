import { combineReducers } from "redux";
import userReducer from './users_reducer'
import holdingsReducer from './holdings_reducer'
import watchlistReducer from './watchlist_reducer'

const entitiesReducer = combineReducers({
    users: userReducer,
    holdings: holdingsReducer,
    watchlist: watchlistReducer
})

export default entitiesReducer