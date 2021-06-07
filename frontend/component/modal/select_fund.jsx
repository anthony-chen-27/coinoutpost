import React from 'react'
import './select_asset.css'
import { ImArrowLeft2 } from 'react-icons/im'

class SelectFund extends React.Component {
    constructor(props) {
        super(props)
        this.state = {render: false}
    }

    componentDidMount() {
        setTimeout(() => this.setState({render: true}), 100)
    }
    
    render() {
        if (!this.state.render) {
            return null
        }
        return (
            <div>
                <div className='select-asset-header'>
                    {this.props.name}
                </div>
                <div onClick={() => this.props.action(0)} className='select-asset-back'>
                    <ImArrowLeft2 />
                </div>
                <ul className='select-fund-list'> 
                    <li marked='1'>
                        <img src={'https://api.iconify.design/cryptocurrency:usd.svg?color=%231652f0&width=35px&height=35px'} style={{width: '35px', height: '35px', marginLeft:'20px'}}/>
                        <div className="asset-list-item">
                            <span>US Dollars</span>
                            <span>USD</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SelectFund

