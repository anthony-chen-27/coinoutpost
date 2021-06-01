import * as PriceUtil from '../util/price_util'

// Expects an array of coin names
export const getCurrentPrice = (coins) => (dispatch) => {
    PriceUtil.fetchCurrentPrices(coins).then(
        data => dispatch({type: "RECEIVE_CURRENT_PRICE", data})
    )
}