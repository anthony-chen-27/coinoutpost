import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logout } from '../../action/session_action'
import { getCurrentPrice } from '../../action/price_action'
import { fetchHoldings } from '../../action/holding_action'
import DashboardGraph from './dashboard/dashboard_graph.jsx'
import './dashboard.css'

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
        this.state = {loading: true}
    }

    componentDidMount() {
        const {coins} = this.props
        Promise.all([this.props.fetchHoldings(this.props.currentUser.id)]).then(() => this.setState({loading: false}))
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
                <button type="button" onClick={(e) => {logout()}}>
                Logout
                </button>
                <div style={{width:400, height:300}}><DashboardGraph coin={this.props.coins[1]} />Bitcoin</div>
                <div style={{width:400, height:300}}><DashboardGraph coin={this.props.coins[2]} />Ethereum</div>
                <div style={{width:400, height:300}}><DashboardGraph coin={this.props.coins[3]} />Tether</div>
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {logout, getCurrentPrice, fetchHoldings})(Dashboard))
