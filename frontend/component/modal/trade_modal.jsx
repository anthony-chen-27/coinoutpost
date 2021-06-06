import React from 'react'
import './trade_modal.css'
import Buytab from './buy_tab'
import Selltab from './sell_tab'
import SelectAsset from './select_asset'
import { connect } from 'react-redux'

const mSTP = ({coins}) => {
    return {
        coins
    }
}


class Trademodal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {header: 0, display: 0, buyselect: 1, sellselect: 1}
        this.changeHeader = this.changeHeader.bind(this)
        this.changeDisplay = this.changeDisplay.bind(this)
        this.buyselect = this.buyselect.bind(this)
        this.sellselect = this.sellselect.bind(this)
    }

    changeHeader(i) {
        if (i == this.state.header) {
            return
        } else {
            this.setState({header: i})
        }
    }

    changeDisplay(i) {
        this.setState({display: i})
    }

    buyselect(i) {
        this.setState({buyselect: i, display: 0})
    }
    
    sellselect(i) {
        this.setState({sellselect: i, display: 0})
    }

    render() {
        const {display} = this.state
        console.log(this.state.sellselect)
        return (
        <div> 
            <div className='graybg' onClick={this.props.toggleBuy}> 
                <div className='trade-modal' style={{height: display == 1 || display == 2 ? '600px' : '540px'}}>
                    { this.state.display === 0 ? 
                        <div>
                            <div className='modal-header'>
                                <div style={{borderRadius: '3px 0 0 0'}} value={this.state.header === 0 ? 1 : 0} className='modal-header-item' onClick={() => this.changeHeader(0)}>
                                    Buy
                                </div>
                                <div style={{borderRadius: '0 3px 0 0'}} value={this.state.header === 1 ? 1 : 0} className='modal-header-item' onClick={() => this.changeHeader(1)}>
                                    Sell
                                </div>
                            </div>
                            { this.state.header === 0 ?
                            <Buytab action={this.changeDisplay} selected={this.state.buyselect} coin={this.props.coins[this.state.buyselect]}/>
                            : <Selltab action={this.changeDisplay} selected={this.state.sellselect} coin={this.props.coins[this.state.sellselect]}/>
                            }
                        </div>
                    : null}
                    { this.state.display === 1 ? 
                        <SelectAsset action={this.changeDisplay} changeSelect={this.buyselect} selected={this.state.buyselect}/>
                    : null}
                    { this.state.display === 2 ? 
                        <SelectAsset action={this.changeDisplay} changeSelect={this.sellselect} selected={this.state.sellselect}/>
                    : null}
                </div>
            </div>
        </div>)
    }
}

export default connect(mSTP, null)(Trademodal)