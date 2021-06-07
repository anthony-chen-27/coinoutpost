export const createTransaction = (data) => {
    return $.ajax({
        method: "POST",
        url: "/api/transactions",
        data: {transaction: data}
    })
}


export const fetchTransactions = (userId) => {
    return $.ajax({
        method: "GET",
        url: '/api/transactions',
        data: {id: userId}
    })
}

// $.ajax({
//     method: "POST",
//     url: "/api/transactions",
//     data: {transaction: {
//         sender_id: null,
//         receiver_id: 1,
//         crypto_id: 5,
//         amount: 0.0043,
//         total: 4000}
//     }
// })



// {sender_id: null,receiver_id: 1,
// crypto_id: 5,
// amount: 0.0043,
// total: 4000}