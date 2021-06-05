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

const Assetlistitem = ({coin}) => {
    let {shorthand, name} = coin
    let args = {name: shorthand.toLowerCase(), color: COIN_COLORS[shorthand].slice(1)}
    let url = `https://api.iconify.design/cryptocurrency:${args.name}.svg?color=%23${args.color}&width=25px&height=25px`
    return <li><img src={url}/> : {capitalize(name)} :: {shorthand} </li>
}

class Selectasset extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                        return <Assetlistitem key={i} coin={coin}/>
                    })}
                </ul>
            </div>
        )
    }
}

export default connect(mSTP)(Selectasset)

