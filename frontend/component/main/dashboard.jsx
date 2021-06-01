import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logout } from '../../action/session_action'
import { getCurrentPrice } from '../../action/price_action'
import { fetchHoldings } from '../../action/holding_action'

const mSTP = ({session, entities: { users, holdings}, coins}) => {
    return {
        currentUser: users[session.id],
        coins: Object.values(coins),
        holdings: Object.values(holdings)
    }
}


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchHoldings(this.props.currentUser.id)
        this.props.getCurrentPrice(this.props.coins.map((coin) => {return coin.name}))
        this.timer = setInterval(() => this.props.getCurrentPrice(this.props.coins.map((coin) => {return coin.name})), 60000)
    }

    render() {
        const {logout, currentUser} = this.props
        const {coins} = this.props
        return (
            <div>
                <h3>This is the dashboard</h3>
                <h3>Welcome {currentUser.firstName} {currentUser.lastName}</h3>
                <h3>user_id: {currentUser.id}</h3>
                <h3>username: {currentUser.username}</h3>
                <h3>Current holdings:</h3>
                <ul>
                    {this.props.holdings.map((holding, i) => {return <li key={i}>{coins[holding.cryptoId].name} : {holding.amount}</li>})}
                </ul>
                <h3>Current Balance is </h3>
                <button type="button" onClick={(e) => {logout()}}>
                Logout
                </button>          
            </div>
        )
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }
}

export default withRouter(connect(mSTP, {logout, getCurrentPrice, fetchHoldings})(Dashboard))
