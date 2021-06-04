import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logout } from '../../action/session_action'
import { getCurrentPrice } from '../../action/price_action'
import { fetchHoldings } from '../../action/holding_action'
import DashboardGraph from './dashboard/dashboard_graph.jsx'
import './dashboard.css'
import { Icon, InlineIcon } from '@iconify/react';

import * as COIN_COLORS from 'crypto-colors'


function thing() {
    fetch('https://api.iconify.design/cryptocurrency:bcc.svg').then(x => x.text()).then(d => console.log(<Icon icon={d}></Icon>))
}

function calculateBalance(holdings, prices, coins) {
    let total = 0
    holdings.forEach((holding) => {
        total += holding.amount * prices[coins[holding.cryptoId].name].usd 
    })
    return total
}

const mSTP = ({session, entities: { users, holdings}, coins, prices}) => {
    return {
        currentUser: users[session.id],
        coins,
        holdings: Object.values(holdings),
        prices
    }
}


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true, data: ""}
    }

    componentDidMount() {
        const {coins} = this.props
        Promise.all([this.props.fetchHoldings(this.props.currentUser.id)]).then(() => this.setState({loading: false}))
        fetch('https://api.iconify.design/cryptocurrency:bcc.svg').then(x => x.text()).then(data => this.setState({data: data}))
    }

    render() {
        if (this.state.loading) {
            return null
        }
        const {logout, currentUser} = this.props
        const {coins} = this.props
        let balance = 0
        if (!jQuery.isEmptyObject(this.props.prices.current)) {
            balance = calculateBalance(this.props.holdings, this.props.prices.current, coins)
        }
        return (
            <div className='dashboard'>
                <h2>This is the dashboard</h2>
                <h3>Welcome {currentUser.firstName} {currentUser.lastName}</h3>
                <h3>user_id: {currentUser.id}</h3>
                <h3>username: {currentUser.username}</h3>
                <h3>Current Balance is : {balance} </h3>
                <div className='watchlist-grid'>
                    <div><DashboardGraph coin={this.props.coins[1]} /></div>
                    <div><DashboardGraph coin={this.props.coins[2]} /></div>
                    <div><DashboardGraph coin={this.props.coins[3]} /></div>
                    <div><DashboardGraph coin={this.props.coins[5]} /></div>
                    <div><DashboardGraph coin={this.props.coins[9]} /></div>
                    <div><DashboardGraph coin={this.props.coins[11]} /></div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {logout, getCurrentPrice, fetchHoldings})(Dashboard))
