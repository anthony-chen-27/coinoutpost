import React from 'react'
import { connect } from 'react-redux'
import './select_asset.css'
import { ImArrowLeft2 } from 'react-icons/im'
import * as COIN_COLORS from 'crypto-colors'

const mSTP = ({coins}) => {
    return {
        coins: Object.values(coins)
    }
}

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1)
}

const Assetlistitem = ({coin, selected, index, change}) => {
    let {shorthand, name} = coin
    let args = {name: shorthand.toLowerCase(), color: COIN_COLORS[shorthand].slice(1)}
    let url = `https://api.iconify.design/cryptocurrency:${args.name}.svg?color=%23${args.color}&width=35px&height=35px`
    return (
    <li marked={selected ? 1 : 0} onClick={() => {change(index)}}>
        <img style={{width: '35px', height: '35px', marginLeft:'20px'}} src={url}/>
        <div className="asset-list-item">
            <span>{capitalize(name)}</span>
            <span>{shorthand}</span>
        </div>
    </li>)
}

class Selectasset extends React.Component {
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
                    Select asset
                </div>
                <div onClick={() => this.props.action(0)} className='select-asset-back'>
                    <ImArrowLeft2 />
                </div>
                <ul className='select-asset-list'> 
                    {this.props.coins.map((coin, i) => {
                        return <Assetlistitem key={i} index={i + 1} coin={coin} selected={this.props.selected === i + 1 ? 1 : 0} change={this.props.changeSelect}/>
                    })}
                </ul>
            </div>
        )
    }
}

export default connect(mSTP)(Selectasset)

