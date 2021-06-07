import React from 'react'
import { connect } from 'react-redux'
import './preview.css'
import { ImArrowLeft2 } from 'react-icons/im'

class Preview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let amount = parseFloat(this.props.amount.slice(1))
        let {price} = this.props
        let {shorthand} = this.props.coin
        let holding = this.props.holdings.find((ele) => ele.cryptoId == this.props.coin.id)
        return (
            <div>
                <div className='select-asset-header'>
                    Order preview
                </div>
                <div className='select-asset-back' onClick={() => this.props.action(0)} >
                    <ImArrowLeft2 />
                </div>
                <div className="preview-body">
                    <div className='preview-amount'>{parseFloat((amount / price).toFixed(8))} {shorthand}</div>
                    <br />
                    <div className='preview-body-content'>
                        <div>{this.props.type == 'buy' ? 'Pay with' : 'Deposit to'}
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img src={'https://api.iconify.design/cryptocurrency:usd.svg?color=%231652f0&width=22px&height=22px'} style={{marginRight: '5px'}}/>
                                Cash (USD)
                            </div>
                        </div>
                        <div>Price <div>{price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} / {shorthand}</div></div>
                        <div>{this.props.type == 'buy' ? 'Purchase' : 'Sale'} <div>{amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</div></div>
                        <div>Total <div>{amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</div></div>
                    </div>
                    <button className='preview-trade-btn'>{this.props.type == 'buy' ? 'Buy now' : 'Sell now'}</button>
                    <div className='modal-holding-info'>
                        {shorthand} Balance
                        <div>
                            {holding ? 
                            `${holding.amount} ${shorthand} ≈ ${(holding.amount * this.props.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`
                            : `0 ${shorthand} ≈ $0.00`}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview