import React from 'react'
import './trade_modal.css'
import Buytab from './buy_tab'
import Selltab from './sell_tab'
import SelectAsset from './select_asset'
import SelectFund from './select_fund'
import Preview from './preview'
import { fetchHoldings } from '../../action/holding_action'
import { connect } from 'react-redux'

const mSTP = ({entities: {users, holdings}, coins, ui, session, prices}) => {
    return {
        holdings: Object.values(holdings),
        coins,
        ui,
        currentUser: users[session.id],
        prices: prices.current
    }
}


class Trademodal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {header: 0, display: 0, buyselect: 1, sellselect: 1, height: '460px', buyamount: '', sellamount: ''}
        this.display = {0: '500px', 1: '560px', 2: '560px'}
        this.changeHeader = this.changeHeader.bind(this)
        this.changeDisplay = this.changeDisplay.bind(this)
        this.buyselect = this.buyselect.bind(this)
        this.sellselect = this.sellselect.bind(this)
        this.changeHeight = this.changeHeight.bind(this)
        this.buyamount = this.buyamount.bind(this)
        this.sellamount = this.sellamount.bind(this)
    }

    changeHeader(i) {
        if (i == this.state.header) {
            return
        } else {
            this.setState({header: i})
        }
    }

    changeDisplay(i) {
        if (i == 1 || i == 2) {
            this.setState({display: i, height: '500px'})
        } else if (i == 3 || i == 4) {
            this.setState({display: i, height: '420px'})
        } else if (i == 5 || i == 6) {
            this.setState({display: i, height: '420px'})
        } else {
            this.setState({display: i, height: '460px'})
        }
    }

    buyamount(i) {
        this.setState({buyamount: i})
    }
    sellamount(i) {
        this.setState({sellamount: i})
    }

    changeHeight(h) {
        if (this.state.display == 1 || this.state.display == 2) return
        this.setState({height: h})
    }

    buyselect(i) {
        this.setState({buyselect: i, display: 0, height: '460px'})
    }
    
    sellselect(i) {
        this.setState({sellselect: i, display: 0, height: '460px'})
    }

    render() {
        const {display} = this.state
        if (this.props.ui.loading) {
            return null
        }
        let buycoin = this.props.coins[this.state.buyselect]
        let sellcoin = this.props.coins[this.state.sellselect]
        return (
        <div> 
            <div className='graybg' onClick={this.props.toggleBuy}> 
                <div className='trade-modal' style={{height: this.state.height}}>
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
                            <Buytab action={this.changeDisplay} selected={this.state.buyselect} coin={buycoin} cHeight={this.changeHeight} buy={this.buyamount} amount={this.state.buyamount} holdings={this.props.holdings} price={this.props.prices[buycoin.name].usd}/>
                            : <Selltab action={this.changeDisplay} selected={this.state.sellselect} coin={sellcoin} cHeight={this.changeHeight} sell={this.sellamount} amount={this.state.sellamount} holdings={this.props.holdings} price={this.props.prices[sellcoin.name].usd}/>
                            }
                        </div>
                    : null}
                    { this.state.display === 1 ? 
                        <SelectAsset action={this.changeDisplay} changeSelect={this.buyselect} selected={this.state.buyselect}/>
                    : null}
                    { this.state.display === 2 ? 
                        <SelectAsset action={this.changeDisplay} changeSelect={this.sellselect} selected={this.state.sellselect}/>
                    : null}
                    { this.state.display === 3 ? 
                        <SelectFund action={this.changeDisplay} name={'Pay with'}/>
                    : null}
                    { this.state.display === 4 ? 
                        <SelectFund action={this.changeDisplay} name={'Deposit to'}/>
                    : null}
                    { this.state.display === 5 ? 
                        <Preview action={this.changeDisplay} amount={this.state.buyamount} price={this.props.prices[buycoin.name].usd} type={'buy'} coin={buycoin} holdings={this.props.holdings} close={this.props.toggleBuy}/>
                    : null}
                    { this.state.display === 6 ? 
                        <Preview action={this.changeDisplay} amount={this.state.sellamount} price={this.props.prices[sellcoin.name].usd} type={'sell'} coin={sellcoin} holdings={this.props.holdings} close={this.props.toggleBuy}/>
                    : null}
                </div>
            </div>
        </div>)
    }
}

export default connect(mSTP, {fetchHoldings})(Trademodal)