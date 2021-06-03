import * as WatchUtil from '../util/watchlist_util'

export const fetchWatchlist = (user_id) => (dispatch) => {
    return WatchUtil.fetchWatchlist(user_id).then(
        (data) => dispatch({type: "RECEIVE_WATCHLIST", data})
    )    
}

export const createWatch = (payload) => (dispatch) => {
    return WatchUtil.createWatch(payload).then(
        (data) => dispatch({type: "RECEIVE_WATCH", data})
    )
}

export const removeWatch = (watch_id) => (dispatch) => {
    return WatchUtil.removeWatch(watch_id).then(
        (data) => dispatch({type: "REMOVE_WATCH", data})
    )
}