// Given a array of coinnames, fetches the current prices of the coins from coingecko api
export const fetchCurrentPrices = (coins) => {
    coins = Object.values(coins).map((coin) => coin.name)
    let ids = coins.join(",")
    let vs_currencies = 'usd'
    return $.ajax({
        method: "GET",
        url: "https://api.coingecko.com/api/v3/simple/price",
        data: {
            ids,
            vs_currencies
        }
    })
}