import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logout } from '../../action/session_action'
import { getCurrentPrice } from '../../action/price_action'
import { fetchHoldings } from '../../action/holding_action'

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
        Promise.all([this.props.fetchHoldings(this.props.currentUser.id), this.props.getCurrentPrice(coins)]).then(() => this.setState({loading: false}))
        this.timer = setInterval(() => this.props.getCurrentPrice(coins), 60000)
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
            <div className="content">
                <h3>This is the dashboard</h3>
                <h3>Welcome {currentUser.firstName} {currentUser.lastName}</h3>
                <h3>user_id: {currentUser.id}</h3>
                <h3>username: {currentUser.username}</h3>
                <Link to='/holdings'>Click to view holdings</Link>
                <h3>Current Balance is : {balance} </h3>
                <button type="button" onClick={(e) => {logout()}}>
                Logout
                </button>
                <div className='testing'></div>      
            </div>
        )
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }
}

export default withRouter(connect(mSTP, {logout, getCurrentPrice, fetchHoldings})(Dashboard))
