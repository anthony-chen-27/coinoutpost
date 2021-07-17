import React from 'react'
import { connect } from 'react-redux'
import './transaction_item.css'

const mSTP = ({coins, ui}) => {
    return {
        coins,
        ui
    }
}

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1)
}

const BuyIcon = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" type="buy" fill='rgba(17, 51, 83, 0.6)'>
            <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23a11 11 0 1111-11 11 11 0 01-11 11z"></path>
            <path d="M17 10H7.21l2.14-2.15-.7-.7-3 3a.47.47 0 00-.11.54A.5.5 0 006 11h11zM18 13H7v1h9.79l-2.14 2.15.7.7 3-3a.47.47 0 00.11-.54A.5.5 0 0018 13z"></path>
        </svg>
    )
}


const SellIcon = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" type="buy" fill='rgba(17, 51, 83, 0.6)' style={{transform: 'scaleX(-1)'}}>
            <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23a11 11 0 1111-11 11 11 0 01-11 11z"></path>
            <path d="M17 10H7.21l2.14-2.15-.7-.7-3 3a.47.47 0 00-.11.54A.5.5 0 006 11h11zM18 13H7v1h9.79l-2.14 2.15.7.7 3-3a.47.47 0 00.11-.54A.5.5 0 0018 13z"></path>
        </svg>
    )
}

class TransactionItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.ui.loading) {
            return null
        }
        const {transact, coins} = this.props
        const time = transact.createdAt.slice(0,10)
        const date = new Date(time.slice(0, 4), time.slice(5, 7) - 1, time.slice(8)).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
        const amount = `${parseFloat(transact.amount.toFixed(8))} ${coins[transact.cryptoId].shorthand}`
        const total = (transact.amount * transact.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
        return (
        <li>
            <div>{transact.senderId ? <SellIcon /> : <BuyIcon />}</div>
            <div>
                <span>{transact.senderId ? 'Sold' : 'Bought'} {capitalize(coins[transact.cryptoId].name)}</span>
                <span style={{fontSize:'14px', color: 'rgba(17, 51, 83, 0.6)'}}>on {date}</span>
            </div>
            <div>
                <span >{transact.senderId ? `-${amount} ` : `+${amount}`}</span>
                <span style={{color: 'rgba(17, 51, 83, 0.6)'}}>{transact.senderId? `+${total} USD` : `-${total} USD`}</span>
            </div>
        </li>)
    }
}

export default connect(mSTP, null)(TransactionItem)