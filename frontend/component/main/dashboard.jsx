import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logout } from '../../action/session_action'

const mSTP = ({session, entities: { users }}) => {
    return {
        currentUser: users[session.id]
    }
}

const Dashboard = ({logout, currentUser}) => {
    function handleClick() {
        logout()
    }

    return (
        <div>
            <h3>This is the dashboard</h3>
            <h3>Welcome {currentUser.firstName} {currentUser.lastName}</h3>
            <h3>user_id: {currentUser.id}</h3>
            <h3>username: {currentUser.username}</h3>
            <button type="button" onClick={handleClick}>
            Logout
            </button>          
        </div>
    );
}



export default withRouter(connect(mSTP, {logout})(Dashboard))