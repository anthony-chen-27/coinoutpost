//Expects id of an user and fetches the coins that that user is watching
export const fetchWatchlist = (user_id) => {
    return $.ajax({
        method: "GET",
        url: "/api/watchlists",
        data: {id: user_id}
    })
}


//expects a data of {user_id: x, crypto_id: y} and creates an appropriate entry 
//in the database
export const createWatch = (data) => {
    return $.ajax({
        method: "POST",
        url: "/api/watchlists",
        data: {watch: data}
    })
}


//Expects id of an watchlist entry and deletes that entry from the database
export const removeWatch = (watch_id) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/watchlists/${watch_id}`,
    })
}