import React from 'react'
import { connect } from 'react-redux'
import { createWatch, removeWatch } from '../../../action/watchlist_action'
import {IconContext} from "react-icons"
import {BsStarFill, BsStar} from 'react-icons/bs'
import './watchlist_item.css'
import * as COIN_COLORS from 'crypto-colors'

const mSTP = ({entities, prices}) => {
    return {
        watchlist: entities.watchlist,
        prices: prices.current
    }
}

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1)
}


const calcmarketcap = (mcap) => {
    mcap = parseInt(mcap)
    if (mcap.toString().length >= 10) {
        return `$${(mcap / (10 ** 9)).toFixed(1)}B`
    } else {
        return `$${(mcap / (10 ** 6)).toFixed(1)}M`
    }
}

class WatchlistItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {waiting: false, checked: props.watchlist[props.coin.id]}
        // this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(e) {
        e.preventDefault()
        this.setState({waiting: true})
        if (!this.state.checked) {
            this.props.createWatch({user_id: this.props.user.id, crypto_id: this.props.coin.id}).then((data) => this.setState({waiting: false, checked: !this.state.checked}))
        } else {
            this.props.removeWatch(this.props.watchlist[this.props.coin.id].id).then(() => this.setState({waiting: false, checked: !this.state.checked}))
        }
    }

    render() {
        let {coin, price, index, change, mcap} = this.props
        let args = {name: coin.shorthand.toLowerCase(), color: COIN_COLORS[coin.shorthand].slice(1)}
        let url = `https://api.iconify.design/cryptocurrency:${args.name}.svg?color=%23${args.color}&width=35px&height=35px`
        return (
            <li className='watchlist-item'>
                <div>{index}</div>
                <div className='watchlist-item-icon-info'>
                    <img style={{width: '35px', height: '35px'}} src={url}/>
                    <span>{capitalize(coin.name)}</span>
                    <span style={{color: 'rgba(17, 51, 83, 0.6)'}}>{coin.shorthand}</span>
                </div>
                <div>{price.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}</div>
                <div style={{color: change >= 0 ? 'rgb(5, 177, 105)' : 'rgb(223, 95, 103)'}}>
                    {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                </div>
                <div>{calcmarketcap(mcap)}</div>
                <div onClick={this.handleClick} className="watchlist-star" disabled={this.state.waiting}>
                    {this.state.checked ?
                    <IconContext.Provider value={{style:{color: 'rgb(244, 198, 34)', fontSize:'30px'}}}>
                        <BsStarFill />
                    </IconContext.Provider>
                    :  
                    <IconContext.Provider value={{style:{color: 'rgb(191, 191, 191)', fontSize:'30px'}}}>
                        <BsStar/>
                    </IconContext.Provider>}
                </div>
            </li>
        )
    }
}


export default connect(mSTP, {createWatch, removeWatch})(WatchlistItem)