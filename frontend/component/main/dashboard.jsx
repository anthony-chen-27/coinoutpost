import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { fetchHoldings } from '../../action/holding_action'
import { fetchWatchlist } from '../../action/watchlist_action'
import DashboardGraph from './dashboard/dashboard_graph.jsx'
import './dashboard.css'


function calculateBalance(holdings, prices, coins) {
    let total = 0
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
            <Link to='/'>Hello</Link>
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
    }

    componentDidMount() {
        const {coins} = this.props
        Promise.all([this.props.fetchHoldings(this.props.currentUser.id), this.props.fetchWatchlist(this.props.currentUser.id)]).then(() => this.setState({loading: false}))
        fetch('https://api.iconify.design/cryptocurrency:bcc.svg').then(x => x.text()).then(data => this.setState({data: data}))
    }

    render() {
        if (this.state.loading || this.props.ui.loading) {
            return null
        }
        const {currentUser, coins} = this.props
        let balance = 0
        if (!jQuery.isEmptyObject(this.props.prices.current)) {
            balance = calculateBalance(this.props.holdings, this.props.prices.current, coins)
        }
        let watchlist = Object.values(this.props.watchlist).slice(0, 6)
        const style = styling(watchlist.length)
        return (
            <div className='dashboard'>
                <h2>This is the dashboard</h2>
                <h3>Welcome {currentUser.firstName} {currentUser.lastName}</h3>
                <h3>user_id: {currentUser.id}</h3>
                <h3>username: {currentUser.username}</h3>
                <h3>Current Balance is : {balance} </h3>
                <div className='watchlist-grid' style={{gridTemplateColumns:style.style}}>
                    {watchlist.map((watch, i) => {return <DashboardGraph key={i} coin={coins[watch.cryptoId]}/>})}
                    {style.fill ? <Defaultitem /> : null}
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {fetchHoldings, fetchWatchlist})(Dashboard))
