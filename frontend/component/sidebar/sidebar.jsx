import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './sidebar.css'
import { getCurrentPrice } from '../../action/price_action'
import { updateUi } from '../../action/ui_action'
import { IoIosHome } from 'react-icons/io'
import { AiFillPieChart } from 'react-icons/ai'
import { RiArrowLeftRightFill} from 'react-icons/ri'
import { fetchHoldings } from '../../action/holding_action'
import { IconContext } from 'react-icons'
import { FaAngellist } from 'react-icons/fa'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const mSTP = ({coins, entities: {users}, session}) => {
    return {
        coins,
        currentUser: users[session.id],
    }
}
class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {coins} = this.props
        Promise.all([this.props.fetchHoldings(this.props.currentUser.id), this.props.getCurrentPrice(coins)]).then(() => this.props.updateUi(false))
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
                <div className='sidebar-footer'>
                    <a href="https://github.com/simpleistruth/coinoutpost">
                        <IconContext.Provider value={{style: {fontSize: '20px'}}}><AiFillGithub /></IconContext.Provider>
                    </a>
                    <a href="https://www.linkedin.com/in/anthony-c-b8250b126/">
                        <IconContext.Provider value={{style: {fontSize: '20px'}}}><AiFillLinkedin /></IconContext.Provider>
                    </a>
                    <a href="https://angel.co/u/anthony-chen-18">
                        <IconContext.Provider value={{style: {fontSize: '20px'}}}><FaAngellist /></IconContext.Provider>
                    </a>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {getCurrentPrice, updateUi, fetchHoldings})(Sidebar))