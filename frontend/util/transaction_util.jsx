export const createTransaction = (data) => {
    $.ajax({
        method: "POST",
        url: "/api/transactions",
        data
    })
}


$.ajax({
    method: "POST",
    url: "/api/transactions",
    data: {transaction: {
        sender_id: null,
        receiver_id: 1,
        crypto_id: 5,
        amount: 0.0043,
        total: 4000}
    }
})