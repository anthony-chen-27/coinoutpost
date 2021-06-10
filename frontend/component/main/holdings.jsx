import React from 'react'
import { connect } from 'react-redux'
import { fetchHoldings } from '../../action/holding_action'
import { fetchTransactions } from '../../action/transaction_action'
import HoldingsItem from './holdings/holdings_item'
import TransactionItem from './holdings/transaction_item'
import './holdings/holdings.css'

const mSTP = ({entities: {users, holdings, transactions}, coins, ui, session, prices}) => {
    return {
        holdings: Object.values(holdings),
        coins,
        ui,
        transactions: Object.values(transactions),
        currentUser: users[session.id],
        currentPrice: prices.current
    }
}

function calculateTotal(holdings, prices, coins, usd) {
    let total = usd
    holdings.forEach((holding) => {
        total += holding.amount * prices[coins[holding.cryptoId].name].usd 
    })
    return total
}


const USDItem = (props) => {
    let url = 'https://api.iconify.design/cryptocurrency:usd.svg?color=%231652f0&width=25px&height=25px'
    const alloc = (props.amount / props.total) * 100
    return (<li>
        <div><img style={{marginRight: '10px', width: '30px', height: '30px'}} src={url}/>US Dollar</div>
        <span style={{width: '40%'}}>
                {`${props.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}   `}
        </span>
        <div className='holding-item-alloc'>
                <div style={{backgroundColor: '#1652f0', width: `${Math.max(parseInt(alloc) * 2, 8)}px`}}></div>
                <span>{alloc.toFixed(2)}%</span>
        </div>
    </li>)
}



class Holdings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true}
    }

    componentDidMount() {
        Promise.all([this.props.fetchHoldings(this.props.user.id), this.props.fetchTransactions(this.props.user.id)]).then(() => {this.setState({loading: false})})
    }

    render() {
        if (this.state.loading || this.props.ui.loading) {
            return null
        }
        let {coins, currentPrice, holdings, currentUser} = this.props
        const total = calculateTotal(holdings, currentPrice, coins, currentUser.amount)
        let transactions = this.props.transactions.sort((first, second) => { 
            if (first.createdAt > second.createdAt) return -1;
            if (first.createdAt < second.createdAt) return 1;
            return 0;
        }).slice(0, 10)
        return (
            <div className='holdings'>
                <div className="holding-list-container">
                    <div className='holding-header-container'>
                        <div className='holding-header-title'>Your assets</div>
                        <div className='holding-header'>
                            <span style={{width: '30%'}}>Asset</span>
                            <span style={{width: '40%'}}>Balance</span>
                            <span style={{display: 'flex', width: '30%', justifyContent:'flex-end'}}>Allocation</span>
                        </div>
                    </div>
                    <ul className='holding-list'>
                        <USDItem amount={this.props.currentUser.amount} total={total} />

                        {/* {this.props.holdings.map((holding, i) => {return <HoldingsItem coin={coins[holding.cryptoId]} holding={holding} key={i} price={currentPrice[coins[holding.cryptoId].name]} total={total}/>})} */}
                        {Object.values(coins).map((coin, i) => {return <HoldingsItem key={i} coin={coin} holding={holdings.find((ele) => ele.cryptoId == coin.id)} price={currentPrice[coin.name]} total={total}/>})}
                    </ul>
                </div>
                <div className='holding-transaction'>
                    <div className='holding-transaction-header'>
                        Recent transactions
                    </div>
                    <ul className='holding-transaction-list'>
                        {transactions.map((transact, index) => {return <TransactionItem transact={transact} key={index}/>})}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mSTP, {fetchHoldings, fetchTransactions})(Holdings)






