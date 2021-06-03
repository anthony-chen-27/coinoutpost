import React from 'react'
import { connect } from 'react-redux'
import { createWatch, removeWatch } from '../../action/watchlist_action'

const mSTP = ({entities, prices}) => {
    return {
        watchlist: entities.watchlist,
        prices: prices.current
    }
}

class WatchlistItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {waiting: false}
    }

    // have acces to createWatch and removeWatch
    handleChange(e) {
        e.preventDefault()
        this.setState({waiting: true})
        //Was false, should create
        if (e.target.checked) {
            this.props.createWatch({user_id: this.props.user.id, crypto_id: this.props.coin.id}).then(() => this.setState({waiting: false}))
        } else {
            this.props.removeWatch(this.props.watchlist[this.props.coin.id].id).then(() => this.setState({waiting: false}))
        }
    }

    render() {
        let {coin, watchlist, prices} = this.props
        return (
            <li>{coin.name} :: {coin.shorthand} :: Current price: {prices[coin.name].usd}
                <input type="checkbox" checked={watchlist[coin.id] ? 1 : 0} onChange={this.handleChange} disabled={this.state.waiting}/>
            </li>
        )
    }
}


export default connect(mSTP, {createWatch, removeWatch})(WatchlistItem)