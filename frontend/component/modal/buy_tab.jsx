import React from 'react'
import './buy_tab.css'
import {IoIosArrowForward} from 'react-icons/io'
import * as COIN_COLORS from 'crypto-colors'
import { connect } from 'react-redux'

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1)
}

const mSTP = ({entities: {users}, session}) => {
    return {
        currentUser: users[session.id],
    }
}

class Buytab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: this.props.amount, error: ''}
        this.handleChange = this.handleChange.bind(this)
        this.handlebuy = this.handlebuy.bind(this)
    }

    componentWillUnmount() {
        if (this.state.error != '') this.props.cHeight('460px')
    }

    handlebuy(e) {
        e.preventDefault()
        if (this.state.value == '') {
            this.props.cHeight('480px')
            this.setState({error: 'Please enter a valid input amount'})
        } else {
            if (this.state.error != '') {
                return
            }
            this.props.buy(this.state.value)
            this.props.action(5)
        }
    }

    handleChange(e) {
        e.preventDefault()
        if (this.state.value === '') {
            if (!isNaN(parseInt(e.target.value))) {
                if (parseFloat(e.target.value) > this.props.currentUser.amount) {
                    this.props.cHeight('480px')
                    this.setState({value:`$${e.target.value}`, error: "You don't have enough to cover this purchase"})
                    return 
                }
                if (this.state.error != '') this.props.cHeight('460px')
                this.setState({value: `$${e.target.value}`, error:''})
            }
        } else {
            if (e.target.value === '$') {
                this.setState({value: ''})
            } else if (e.target.value.length > 9) {
                return
            } else if (isNaN(e.target.value.slice(1))) {
                return 
            } else {
                if (e.target.value.split(".").length == 2) {
                    if (e.target.value.split('.')[1].length > 2) return
                }
                if (parseFloat(e.target.value.slice(1)) > this.props.currentUser.amount) {
                    this.props.cHeight('480px')
                    this.setState({value: e.target.value, error: "You don't have enough to cover this purchase"})
                    return 
                }
                if (this.state.error != '') this.props.cHeight('460px')
                this.setState({value: e.target.value, error: ''})
            }
        }
    }

    render() {
        let {shorthand, name} = this.props.coin
        let args = {name: shorthand.toLowerCase(), color: COIN_COLORS[shorthand].slice(1)}
        let url = `https://api.iconify.design/cryptocurrency:${args.name}.svg?color=%23${args.color}&width=24px&height=24px`
        let holding = this.props.holdings.find((ele) => ele.cryptoId == this.props.coin.id)
        return (
        <div className='modal-buy-tab'>
            <div className='buy-tab-text'>Buy {capitalize(name)}</div>
            <input type="text" value={this.state.value} className='buy-input' placeholder='$0' onChange={this.handleChange}/>
            {this.state.error != '' ? <div className='trade-modal-error'>{this.state.error}</div> : null}
            <div className='buy-tab-controls'>
                <div className='modal-tab-btn' onClick={() => this.props.action(1)} style={{borderBottom: '1px solid rgb(236, 239, 241)'}}>
                    <div className='modal-tab-btn-inner'>
                        <div className='modal-btn-text'>Buy</div>
                        <div className='modal-btn-info'>
                            <img src={url} style={{marginRight: '10px'}}/>
                            {capitalize(name)}
                        </div>
                        <IoIosArrowForward className='chevron'/>
                    </div>
                </div>
                <div className='modal-tab-btn' onClick={() => this.props.action(3)}>
                    <div className='modal-tab-btn-inner'>
                        <div className='modal-btn-text'>Pay with</div>
                        <div className='modal-btn-info'>
                            <img src={'https://api.iconify.design/cryptocurrency:usd.svg?color=%231652f0&width=25px&height=25px'} style={{marginRight: '10px'}}/>
                            Cash (USD)
                        </div>
                        <IoIosArrowForward className='chevron'/>
                    </div>
                </div>
            </div>
            <button className='modal-buy-btn' onClick={this.handlebuy}>
                {this.state.value == '' ? `Buy ${capitalize(name)}` : 'Preview Buy'}
            </button>
            <div className='modal-holding-info'>
                {shorthand} Balance
                <div>
                    {holding ? 
                    `${holding.amount.toFixed(2)} ${shorthand} ≈ ${(holding.amount * this.props.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`
                    : `0 ${shorthand} ≈ $0.00`}
                </div>
            </div>
        </div>)
    }
}

export default connect(mSTP, null)(Buytab)