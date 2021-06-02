import React from 'react'
import { connect } from 'react-redux'
import { fetchHoldings } from '../../action/holding_action'


const mSTP = ({entities: {holdings}, coins}) => {
    return {
        holdings: Object.values(holdings),
        coins
    }
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
        if (this.state.loading) {
            return null
        }
        return (
            <div className='holdings'>
                <h1>Current holdings</h1>
                <ul>
                    {this.props.holdings.map((holding, i) => {return <li key={i}>{this.props.coins[holding.cryptoId].name} : {holding.amount}</li>})}
                </ul>
            </div>
        )
    }
}

export default connect(mSTP, {fetchHoldings})(Holdings)






