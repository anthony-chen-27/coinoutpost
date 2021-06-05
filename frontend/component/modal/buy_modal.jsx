import React from 'react'
import './buy_modal.css'
import Buytab from './buy_tab'
import Selltab from './sell_tab'

export default class Buymodal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {header: 0}
        this.changeHeader = this.changeHeader.bind(this)
    }

    changeHeader(i) {
        if (i == this.state.header) {
            return
        } else {
            this.setState({header: i})
        }
    }

    render() {
        return (<div> 
            <div className='graybg' onClick={this.props.toggleBuy}>
                <div className='buy-modal'>
                    <div className='modal-header'>
                        <div style={{borderRadius: '3px 0 0 0'}} value={this.state.header === 0 ? 1 : 0} className='modal-header-item' onClick={() => this.changeHeader(0)}>
                            Buy
                        </div>
                        <div style={{borderRadius: '0 3px 0 0'}} value={this.state.header === 1 ? 1 : 0} className='modal-header-item' onClick={() => this.changeHeader(1)}>
                            Sell
                        </div>
                    </div>
                    { this.state.header === 0 ?
                    <Buytab />
                    : <Selltab />
                    }
                </div>
            </div>
        </div>)
    }
}