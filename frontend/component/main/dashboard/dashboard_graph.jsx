import React from 'react'
import { connect } from 'react-redux'
import { getDayPrice } from '../../../action/price_action'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import * as COIN_COLORS from 'crypto-colors'
import './dashboard_graphic.css'
import ClipLoader from 'react-spinners/ClipLoader'
import { Link } from 'react-router-dom';

const mSTP = ({prices, coins, ui}, {coin}) => {
    return {
        coins,
        current: prices.current,
        ui,
        dayPrice: prices.day[coin.name]
    }
}

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1)
}

class Dashboardgraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true}
    }

    componentDidMount() {
        this.props.getDayPrice(this.props.coin).then(() => {this.setState({loading: false})})
    }

    processData(raw) {
        if (raw.length <= 100) {
            return raw.map((ele) => {return ele[1]})
        } else {
            let tmp = raw.filter((data, i) => {return (i % 5 === 0)})
            return tmp.map((ele) => {return ele[1]})
        }
    }

    render() {
        if (this.state.loading || this.props.ui.loading) {
            return <div style={{display: 'flex', justifyContent: 'center'}}><ClipLoader color={'#1652f0'}/></div>
        } else {
            let data = this.processData(this.props.dayPrice)
            let {shorthand} = this.props.coin
            let args = {name: shorthand.toLowerCase(), color: COIN_COLORS[shorthand].slice(1)}
            let url = `https://api.iconify.design/cryptocurrency:${args.name}.svg?color=%23${args.color}&width=25px&height=25px`
            let change = this.props.current[this.props.coin.name].usd_24h_change.toFixed(2)
            return (
            <div className="coin-graph">
                <div className='coin-graph-description'>
                    <div className="coin-graph-icon-info">
                        <img src={url} style={{ marginRight: '5%'}}/>{capitalize(this.props.coin.name)}
                    </div>
                    <div className='coin-graph-24h'>
                        24h
                    </div>
                </div>
                <div className='coin-graph-info'>
                    <span style={{fontWeight: 600, fontSize: '18px'}}>{this.props.current[this.props.coin.name].usd.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
                    {change >= 0 ? 
                    <span style={{color: 'rgb(5, 177, 105)'}}>+{change}%</span> :
                    <span style={{color: 'rgb(223, 95, 103)'}}>{change}%</span>}
                </div>
                <Sparklines data={data}>
                    <SparklinesLine color={COIN_COLORS[shorthand]} style={{ fill: "none", strokeWidth: 1}}/>
                </Sparklines>
                <div className="coin-graph-overlay"><Link to='/trade'>View asset</Link></div>
            </div>
            )
        }
    }


}


export default connect(mSTP, {getDayPrice})(Dashboardgraph)