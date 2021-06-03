import * as PriceUtil from '../util/price_util'

// Expects an array of coin names
export const getCurrentPrice = (coins) => (dispatch) => {
    return PriceUtil.fetchCurrentPrices(coins).then(
        data => dispatch({type: "RECEIVE_CURRENT_PRICE", data})
    )
}

export const getDayPrice = (coin) => (dispatch) => {
    return PriceUtil.fetchDay(coin.name).then(
        data => dispatch({type: "RECEIVE_DAY_PRICE", coin, data: data.prices})
    )
} 