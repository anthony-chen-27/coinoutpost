import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './sidebar.css'
import { getCurrentPrice } from '../../action/price_action'
import { updateUi } from '../../action/ui_action'
import { IoIosHome } from 'react-icons/io'
import { AiFillPieChart } from 'react-icons/ai'
import { RiArrowLeftRightFill} from 'react-icons/ri'


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
                <button className='sidebar-home-button' onClick={() => this.props.history.replace('/dashboard')}>coinoutpost</button>
                <ul>
                    <li className={this.check_path('/dashboard')}>
                        <div className='sidebar-item' onClick={() => this.props.history.replace('/dashboard')}>
                            <div className='sidebar-circle'><IoIosHome/></div><span>Home</span>
                        </div>
                    </li>
                    <li className={this.check_path('/holdings')}>
                        <div className='sidebar-item' onClick={() => this.props.history.replace('/holdings')}>
                            <div className='sidebar-circle'><AiFillPieChart/></div><span>Holdings</span>
                        </div>
                    </li>
                    <li className={this.check_path('/trade')}>
                        <div className='sidebar-item' onClick={() => this.props.history.replace('/trade')}>
                            <div className='sidebar-circle'><RiArrowLeftRightFill/></div><span>Trade</span>
                        </div>
                    </li>
                </ul>
                <div className='testcircle'></div>        
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {getCurrentPrice, updateUi})(Sidebar))