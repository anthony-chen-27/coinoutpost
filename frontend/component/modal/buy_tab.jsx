import React from 'react'
import './buy_tab.css'
import {IoIosArrowForward} from 'react-icons/io'

class Buytab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {open: false}
    }

    toggle(e) {
        e.preventDefault()
        this.setState({open: !this.state.open})
    }

    render() {
        return (
        <div className='modal-buy-tab'>
            <div>Buy Bitcoin</div>
            <div className='buy-tab-controls'>
                <div onClick={this.toggle} className='buy-tab-btns' style={{borderBottom: '1px solid rgb(236, 239, 241)'}}>
                    <div className='buy-tab-btns-inner'>
                        <div className='buy-btn-text'>Buy</div>
                        <div className='buy-btn-info'>Icon and info</div>
                        <IoIosArrowForward className='chevron'/>
                    </div>
                </div>
                <div className='buy-tab-btns'>
                    <div className='buy-tab-btns-inner'>
                        <div className='buy-btn-text'>Pay with</div>
                        <div className='buy-btn-info'>Icon and info</div>
                        <IoIosArrowForward className='chevron'/>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Buytab