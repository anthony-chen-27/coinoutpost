import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './sidebar.css'
import { getCurrentPrice } from '../../action/price_action'
import { updateUi } from '../../action/ui_action'

const mSTP = ({coins}) => {
    return {
        coins,
    }
}
class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {coins} = this.props
        this.props.getCurrentPrice(coins).then(() => this.props.updateUi(false))
        this.timer = setInterval(() => this.props.getCurrentPrice(coins), 60000)
    }

    check_path(path) {
        if (path === this.props.location.pathname) {
            return 'active_sidebar'
        } else {
            return null
        }
    }

    render() {
        return (
            <div className='sidebar'>
                <button onClick={()=> {this.props.history.replace('/dashboard')}}>Coinoutpost</button>
                <ul>
                    <li className={this.check_path('/dashboard')}><Link to='/dashboard'>Home</Link></li>
                    <li className={this.check_path('/holdings')}><Link to='/holdings'>Holdings</Link></li>
                    <li className={this.check_path('/trade')}><Link to='/trade'>Trade</Link></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {getCurrentPrice, updateUi})(Sidebar))