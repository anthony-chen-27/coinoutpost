import React from 'react'
import { connect } from 'react-redux'
import { getDayPrice } from '../../../action/price_action'
import { Sparklines, SparklinesLine } from 'react-sparklines';

const mSTP = ({prices, coins}, {coin}) => {
    return {
        coins,
        dayPrice: prices.day[coin.name]
    }
}

class Dashboardgraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true}
    }

    componentDidMount() {
        this.props.getDayPrice(this.props.coin).then(() => this.setState({loading: false}))
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
        if (this.state.loading) {
            return null
        } else {
            let data = this.processData(this.props.dayPrice)
            return (
            <div>
                <Sparklines data={data}>
                    <SparklinesLine color='blue' style={{ fill: "none", strokeWidth: 1}}/>
                </Sparklines>
            </div>
            )
        }
    }


}


export default connect(mSTP, {getDayPrice})(Dashboardgraph)