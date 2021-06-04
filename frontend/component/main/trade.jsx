import React from 'react'
import { connect } from 'react-redux'
import { fetchWatchlist} from '../../action/watchlist_action'
import WatchlistItem from './trade/watchlist_item' 

const mSTP = ({entities, coins, prices, ui}) => {
    return {
        holdings: Object.values(entities.holdings),
        coins,
        prices: prices.current,
        ui,
        watchlist: entities.watchlist
    }
}

class Trade extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true}
    }

    componentDidMount() {
        this.props.fetchWatchlist(this.props.user.id).then(() => {this.setState({loading: false})})
    }

    render() {
        if (this.state.loading || this.props.ui.loading) {
            return null
        }
        let coins = Object.values(this.props.coins)
        return (
            <div className='watchlist'>
                <ul>
                    {coins.map((coin, index) => <WatchlistItem key={index} coin={coin} user={this.props.user}/>)}
                </ul>
            </div>
        )
    }
}

export default connect(mSTP, {fetchWatchlist})(Trade)






