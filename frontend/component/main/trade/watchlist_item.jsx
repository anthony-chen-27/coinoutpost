import React from 'react'
import { connect } from 'react-redux'
import { createWatch, removeWatch } from '../../../action/watchlist_action'
import {IconContext} from "react-icons"
import {BsStarFill, BsStar} from 'react-icons/bs'
import './watchlist_item.css'

const mSTP = ({entities, prices}) => {
    return {
        watchlist: entities.watchlist,
        prices: prices.current
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
        console.log(this.state.checked)
        e.preventDefault()
        this.setState({waiting: true})
        if (!this.state.checked) {
            this.props.createWatch({user_id: this.props.user.id, crypto_id: this.props.coin.id}).then((data) => this.setState({waiting: false, checked: !this.state.checked}))
        } else {
            this.props.removeWatch(this.props.watchlist[this.props.coin.id].id).then(() => this.setState({waiting: false, checked: !this.state.checked}))
        }
    }
    render() {
        let {coin, watchlist, prices} = this.props
        return (
            <li className='watchlist-item'>
                {coin.name} :: {coin.shorthand} :: Current price: {prices[coin.name].usd.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}
                {/* <input type="checkbox" checked={watchlist[coin.id] ? 1 : 0} onChange={this.handleChange} disabled={this.state.waiting}/> */}
                <div onClick={this.handleClick} className="watchlist-star" disabled={this.state.waiting}>
                {this.state.checked ?
                <IconContext.Provider value={{color: 'rgb(244, 198, 34)', fontSize:'16px'}}>
                    <BsStarFill />
                </IconContext.Provider>
                :  
                <IconContext.Provider value={{style:{color: 'rgb(191, 191, 191)', fontSize:'16px'}}}>
                    <BsStar/>
                </IconContext.Provider>}
                </div>
            </li>
        )
    }
}


export default connect(mSTP, {createWatch, removeWatch})(WatchlistItem)