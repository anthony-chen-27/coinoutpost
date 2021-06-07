import * as TransactionUtil from '../util/transaction_util'

export const fetchTransactions = (userId) => (dispatch) => {
    return TransactionUtil.fetchTransactions(userId).then(
        (data) => dispatch({type: "RECEIVE_TRANSACTIONS", data: data}))
}

export const createTransaction = (payload) => (dispatch) => {
    let total = {total: payload.sender_id == null ? -1 * payload.total : payload.total}
    return TransactionUtil.createTransaction(payload).then(
        (data) => dispatch({type: "RECEIVE_TRANSACTION", data: Object.assign(data, total)})
    )
}