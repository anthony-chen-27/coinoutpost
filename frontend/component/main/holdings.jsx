import React from 'react'
import { connect } from 'react-redux'
import { fetchHoldings } from '../../action/holding_action'
import HoldingsItem from './holdings/holdings_item'

const mSTP = ({entities: {users, holdings}, coins, ui, session, prices}) => {
    return {
        holdings: Object.values(holdings),
        coins,
        ui,
        currentUser: users[session.id],
        currentPrice: prices.current
    }
}

const USDItem = (props) => {
    let url = 'https://api.iconify.design/cryptocurrency:usd.svg?color=%231652f0&width=25px&height=25px'
    return <li><img src={url}/> : US Dollar : USD :: Balance: {props.amount} </li>
}


class Holdings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true}
    }

    componentDidMount() {
        this.props.fetchHoldings(this.props.user.id).then(() => {this.setState({loading: false})})
    }

    render() {
        if (this.state.loading || this.props.ui.loading) {
            return null
        }
        let {coins, currentPrice} = this.props
        return (
            <div className='holdings'>
                <h1>Current holdings</h1>
                <ul>
                    <USDItem amount={this.props.currentUser.amount} />
                    {this.props.holdings.map((holding, i) => {return <HoldingsItem coin={coins[holding.cryptoId]} holding={holding} key={i} price={currentPrice[coins[holding.cryptoId].name]}/>})}
                </ul>
            </div>
        )
    }
}

export default connect(mSTP, {fetchHoldings})(Holdings)






