import React from 'react'
import './trade_modal.css'
import Buytab from './buy_tab'
import Selltab from './sell_tab'
import SelectAsset from './select_asset'
import { connect } from 'react-redux'


class Trademodal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {header: 0, display: 0}
        this.changeHeader = this.changeHeader.bind(this)
        this.changeDisplay = this.changeDisplay.bind(this)
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
//    height: 540px;
    render() {
        return (
        <div> 
            <div className='graybg' onClick={this.props.toggleBuy}> 
                <div className='trade-modal' style={{height: this.state.display === 1 ? '600px' : '540px'}}>
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
                            <Buytab action={this.changeDisplay}/>
                            : <Selltab />
                            }
                        </div>
                    : null}
                    { this.state.display === 1 ? 
                        <SelectAsset action={this.changeDisplay}/>
                    : null}
                </div>
            </div>
        </div>)
    }
}

export default Trademodal