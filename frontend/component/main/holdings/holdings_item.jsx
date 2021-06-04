import React from 'react'
import * as COIN_COLORS from 'crypto-colors'

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1)
}

class HoldingsItem extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        let balance = (this.props.price.usd * this.props.holding.amount).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
        let {shorthand, name} = this.props.coin
        let args = {name: shorthand.toLowerCase(), color: COIN_COLORS[shorthand].slice(1)}
        let url = `https://api.iconify.design/cryptocurrency:${args.name}.svg?color=%23${args.color}&width=25px&height=25px`
        return <li><img src={url}/> : {capitalize(name)} ::  Balance: {balance} : {this.props.holding.amount} {shorthand} </li>
    }
}

export default HoldingsItem