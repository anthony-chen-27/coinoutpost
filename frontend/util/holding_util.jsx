// Given id of an user, fetches that user's holdings
export const fetchHoldings = (id) => {
    return $.ajax({
        method: "GET",
        url: '/api/holdings',
        data: {id}
    })
}