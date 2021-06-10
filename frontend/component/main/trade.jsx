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
        let {prices} = this.props
        let coins = Object.values(this.props.coins)
        return (
            <div className='trade-watchlist'>
                <div className='trade-watchlist-header'>
                    <div>#</div>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Change</div>
                    <div>Market cap</div>
                    <div>Watch</div>
                </div>
                <ul className='watchlist-list'>
                    {coins.map((coin, index) => <WatchlistItem key={index} index={index} coin={coin} price={prices[coin.name].usd} mcap={prices[coin.name].usd_market_cap} change={prices[coin.name].usd_24h_change}user={this.props.user}/>)}
                </ul>
            </div>
        )
    }
}

export default connect(mSTP, {fetchWatchlist})(Trade)






