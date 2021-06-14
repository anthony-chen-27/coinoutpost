import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { fetchHoldings } from '../../action/holding_action'
import { fetchWatchlist } from '../../action/watchlist_action'
import DashboardGraph from './dashboard/dashboard_graph.jsx'
import './dashboard.css'
import HoldingsItem from './holdings/holdings_item';
import TransactionItem from './holdings/transaction_item';
import {fetchTransactions} from '../../action/transaction_action'


function calculateBalance(holdings, prices, coins, usd) {
    let total = usd
    holdings.forEach((holding) => {
        total += holding.amount * prices[coins[holding.cryptoId].name].usd 
    })
    return total
}

const mSTP = ({session, entities: { users, holdings, watchlist, transactions}, coins, prices}, ui) => {
    return {
        currentUser: users[session.id],
        coins,
        holdings: Object.values(holdings),
        prices,
        watchlist,
        ui,
        transactions: Object.values(transactions)
    }
}

const Defaultitem = () => {
    return (
        <div className='default-graph-item'>
            <Link to='/trade'>{'Discover more assets >'}</Link>
        </div>
    )
}

const Defaultgraph = () => {
    return (
        <div className='default-graph-graph'>
            <img src="https://assets.coinbase.com/assets/coinstack.d9aa4836431e749021f6fbf25bcb60cb.png" />
            <span style={{fontSize:'14px'}}>Add crypto to your watchlist to display them here!</span>
        </div>
    )
}

const styling = (count) => {
    if (count == 0) {
        return {style: 'repeat(0, 1fr)', fill: false}
    } else if (count >= 6) {
        return {style: 'repeat(3, 1fr)', fill: false}
    } else if (count == 5) {
        return {style: 'repeat(3, 1fr', fill: true}
    } else if (count >= 2 && count < 6) {
        return {style: `repeat(${count}, 1fr)`, fill: false}
    } else {
        return {style: 'repeat(2, 1fr)', fill:true}
    }
}


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true, data: ""}
        this.handleTrade = this.handleTrade.bind(this)
    }

    componentDidMount() {
        const {coins} = this.props
        Promise.all([this.props.fetchHoldings(this.props.currentUser.id), this.props.fetchWatchlist(this.props.currentUser.id), this.props.fetchTransactions(this.props.currentUser.id)]).then(() => this.setState({loading: false}))
        fetch('https://api.iconify.design/cryptocurrency:bcc.svg').then(x => x.text()).then(data => this.setState({data: data}))
    }

    handleTrade(e) {
        e.preventDefault()
        const a = document.getElementsByClassName('header-buy-btn')[0].click()
    }

    render() {
        if (this.state.loading || this.props.ui.loading) {
            return null
        }
        const {currentUser, coins, holdings} = this.props
        let balance = 0
        if (!jQuery.isEmptyObject(this.props.prices.current)) {
            balance = calculateBalance(this.props.holdings, this.props.prices.current, coins, currentUser.amount)
        }
        let watchlist = Object.values(this.props.watchlist).slice(0, 6)
        const style = styling(watchlist.length)
        let transactions = this.props.transactions.sort((first, second) => { 
            if (first.createdAt > second.createdAt) return -1;
            if (first.createdAt < second.createdAt) return 1;
            return 0;
        }).slice(0, 5)
        return (
            <div className='dashboard'>
                <div className="dashboard-greeting">
                    <span style={{fontSize:'20px'}}>Welcome {currentUser.firstName} {currentUser.lastName}</span>
                    <span style={{fontSize:'15px', color:'rgba(17, 51, 83, 0.6)'}}>Portfolio balance</span>
                    <span style={{fontSize:'22px'}}>{balance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
                </div>
                <div className='greeting-buy'>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{fontWeight: '500', marginBottom: '3%'}}>Buy and sell cryptocurrency instantly!</div>
                        <button id='greeting-buy-btn' onClick={this.handleTrade}>Trade</button>
                    </div>
                    <img src='https://api.iconify.design/noto:coin.svg' style={{width: '60px', height: '60px'}}/>
                </div>
                <div className='watchlist-graph-container'>
                    <div className='watchlist-graph-header'><span style={{marginLeft: '1.5%', fontWeight:'550', fontSize: '18px'}}>Watchlist</span></div>
                    { watchlist.length > 0 ? <div className='watchlist-graph-grid' style={{gridTemplateColumns:style.style}}>
                        {watchlist.map((watch, i) => {return <DashboardGraph key={i} coin={coins[watch.cryptoId]}/>})}
                        {style.fill ? <Defaultitem /> : null}
                    </div> : <Defaultgraph />}
                    {!style.fill || watchlist.length == 0 ? 
                    <div className='watchlist-graph-footer'>
                        <Link to='/trade'>{'Discover more assets >'}</Link>
                    </div> : null }
                </div>
                <div className="dashboard-infographics">
                    <div className="dashboard-infographics-holdings">
                        <div style={{padding: '20px 2%', borderBottom: '1px solid #eceff1', fontSize: '20px', fontWeight: '500'}}>
                            Your portfolio
                        </div>
                        <ul className='holding-list'>
                            {Object.values(coins).slice(0,5).map((coin, i) => {return <HoldingsItem key={i} coin={coin} holding={holdings.find((ele) => ele.cryptoId == coin.id)} price={this.props.prices.current[coin.name]} total={balance} load={true}/>})}
                        </ul>
                        <div className="dashboard-infographics-footer"><Link to='/trade'>{`Total balance ≈ ${balance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} >`}</Link></div>
                    </div>
                    <div className='dashboard-infographics-transactions'>
                        <div style={{padding: '20px 2%', borderBottom: '1px solid #eceff1', fontSize: '20px', fontWeight: '500'}}>
                            Recent transactions
                        </div>
                        {/* https://api.iconify.design/emojione:money-bag.svg */}
                        <ul className='holding-transaction-list'>
                            {transactions.length > 0 ? transactions.map((transact, index) => {return <TransactionItem transact={transact} key={index}/>}) : 
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', borderBottom: '1px solid #eceff1'}}>
                                <img src="https://api.iconify.design/emojione:money-bag.svg" style={{height: '50px', width: '50px', marginBottom: '20px'}}/>
                                <span style={{fontWeight: '500'}}>You haven't made any transactions yet!</span>
                            </div>}
                        </ul>
                        <div className="dashboard-infographics-footer"><Link to='/holdings'>{'View portfolio >'}</Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {fetchHoldings, fetchWatchlist, fetchTransactions})(Dashboard))
