import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { fetchHoldings } from '../../action/holding_action'
import { fetchWatchlist } from '../../action/watchlist_action'
import DashboardGraph from './dashboard/dashboard_graph.jsx'
import './dashboard.css'
import { grmoney } from 'react-icons/gr'


function calculateBalance(holdings, prices, coins, usd) {
    let total = usd
    holdings.forEach((holding) => {
        total += holding.amount * prices[coins[holding.cryptoId].name].usd 
    })
    return total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
}

const mSTP = ({session, entities: { users, holdings, watchlist}, coins, prices}, ui) => {
    return {
        currentUser: users[session.id],
        coins,
        holdings: Object.values(holdings),
        prices,
        watchlist,
        ui
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
        Promise.all([this.props.fetchHoldings(this.props.currentUser.id), this.props.fetchWatchlist(this.props.currentUser.id)]).then(() => this.setState({loading: false}))
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
        const {currentUser, coins} = this.props
        let balance = 0
        if (!jQuery.isEmptyObject(this.props.prices.current)) {
            balance = calculateBalance(this.props.holdings, this.props.prices.current, coins, currentUser.amount)
        }
        let watchlist = Object.values(this.props.watchlist).slice(0, 6)
        const style = styling(watchlist.length)
        return (
            <div className='dashboard'>
                <div className="dashboard-greeting">
                    <span style={{fontSize:'20px'}}>Welcome {currentUser.firstName} {currentUser.lastName}</span>
                    <span style={{fontSize:'15px', color:'rgba(17, 51, 83, 0.6)'}}>Portfolio balance</span>
                    <span style={{fontSize:'22px'}}>{balance}</span>
                </div>
                <div className='greeting-buy'>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{fontWeight: '500', marginBottom: '3%'}}>Buy and sell cryptocurrency instantly!</div>
                        <button className='greeting-buy-btn' onClick={this.handleTrade}>Trade</button>
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
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {fetchHoldings, fetchWatchlist})(Dashboard))
