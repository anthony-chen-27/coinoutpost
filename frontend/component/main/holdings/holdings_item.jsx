import React from 'react'
import * as COIN_COLORS from 'crypto-colors'
import './holdings.css'
import { connect } from 'react-redux'


const mSTP = ({ui}) => {
    return {
        ui
    }
}

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1)
}

class HoldingsItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.ui.loading) {
            return null;
        }
        let holding = this.props.holding || {amount: 0}
        let balance = (this.props.price.usd * holding.amount)
        let {shorthand, name} = this.props.coin
        let args = {name: shorthand.toLowerCase(), color: COIN_COLORS[shorthand].slice(1)}
        let url = `https://api.iconify.design/cryptocurrency:${args.name}.svg?color=%23${args.color}&width=25px&height=25px`
        let alloc = (balance / this.props.total) * 100
        console.log(balance, this.props.total)
        return (
        <li>
            <div>
                <img style={{marginRight: '10px', width: '30px', height: '30px'}}src={url}/>{capitalize(name)}
                </div>
            <span style={{width: '40%'}}>
                {`${balance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}   `}
                <span style={{color:'rgba(17, 51, 83, 0.6)'}}>
                    {`${parseFloat(holding.amount.toFixed(8))} ${shorthand}`} 
                </span>
            </span>
            <div className='holding-item-alloc'>
                {!this.props.load ? <div style={{backgroundColor: COIN_COLORS[shorthand], width: `${Math.max(parseInt(alloc) * 2, 8)}px`}}></div> : null}
                <span>{alloc.toFixed(2)}%</span>
            </div>
        </li>)
    }
}

export default connect(mSTP, null)(HoldingsItem)