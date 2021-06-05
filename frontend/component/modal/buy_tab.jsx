import React from 'react'
import './buy_tab.css'
import {IoIosArrowForward} from 'react-icons/io'

class Buytab extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div className='modal-buy-tab'>
            <div>Buy Bitcoin</div>
            <div className='buy-tab-controls'>
                <div onClick={() => this.props.action(1)} className='modal-tab-btn' style={{borderBottom: '1px solid rgb(236, 239, 241)'}}>
                    <div className='modal-tab-btn-inner'>
                        <div className='modal-btn-text'>Buy</div>
                        <div className='modal-btn-info'>Icon and info</div>
                        <IoIosArrowForward className='chevron'/>
                    </div>
                </div>
                <div className='modal-tab-btn'>
                    <div className='modal-tab-btn-inner'>
                        <div className='modal-btn-text'>Pay with</div>
                        <div className='modal-btn-info'>Icon and info</div>
                        <IoIosArrowForward className='chevron'/>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Buytab