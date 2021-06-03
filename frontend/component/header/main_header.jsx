import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import "./header.css"
import {FaUserCircle} from 'react-icons/fa'
import {IconContext} from "react-icons"
import { connect } from 'react-redux'
import { logout } from '../../action/session_action'

const mSTP = ({session, entities: {users}}) => {
    return {
        currentUser: users[session.id],
    }
}
class Mainheader extends React.Component {
    constructor(props) {
        super(props)
        this.text = {dashboard: "Home", holdings: "Holdings", trade: "Trade"}
        this.state = {hidden: true}
        this.toggle = this.toggle.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    toggle(e) {
        e.preventDefault()
        if (e.target.className == 'user-dropdown-menu' || e.target.className == 'dropdown-signout') {
            return
        }
        this.setState({ hidden: !this.state.hidden });
    }

    handleClick(e) {
        this.props.logout()
    }

    render() {
        return (
            <div className='main-header'>
                <div className='main-header-left'>{this.text[this.props.location.pathname.slice(1)]}</div>
                <div className='main-header-right'>
                    <button className='header-buy-btn'>Buy / Sell</button>
                    <div className='vertical-line'></div>
                    <div className='user-menu-dropdown' onClick={this.toggle} tabIndex="1">
                        <IconContext.Provider value={{style: {color: 'lightgray', fontSize: '34px'}}}>
                            <FaUserCircle />
                        </IconContext.Provider>
                        <span>{this.props.currentUser.firstName}</span>
                        {!this.state.hidden ?
                            <div>
                                <div className="user-dropdown-menu" >
                                    <IconContext.Provider value={{style: {color: 'lightgray', fontSize: '60px', marginTop: '30px'}}}>
                                        <FaUserCircle />
                                    </IconContext.Provider>
                                    <span style={{marginTop:'20px'}}>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</span>
                                    <span style={{color:'gray', fontWeight: 400, fontSize: '14px'}}>Username: {this.props.currentUser.username}</span>
                                    <div className='horizontal-line'></div>
                                    <div className='dropdown-signout' onClick={this.handleClick}>Sign out</div>
                                </div>
                                <div className='graybg' onClick={this.toggle}>
                                </div>
                            </div>
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mSTP, {logout})(Mainheader))
