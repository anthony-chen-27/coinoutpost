const holdingsReducer = (state = {}, action) => {
    switch(action.type) {
        case "RECEIVE_HOLDINGS":
            return action.data
        case "RECEIVE_TRANSACTION":
            let nextState = Object.assign({}, state)
            let {data} = action
            if (nextState[data.cryptoId]) {
                //Sell action
                if (data.senderId) {
                    nextState[data.cryptoId].amount -= data.amount
                } else {
                    nextState[data.cryptoId].amount += data.amount
                }
                return nextState
            } else {
                nextState[data.cryptoId] = {userId: data.receiverId || data.senderId, cryptoId: data.cryptoId, amount: data.amount}
                return nextState
            }
        default:
            return state
    }
}

export default holdingsReducer