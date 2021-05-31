import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logout } from '../action/session_action'

const mSTP = ({session, entities: { users }}) => {
    return {
        currentUser: users[session.id]
    }
}


const Dashboard = ({logout}) => {

    function handleClick() {
        logout()
    }

    return (
        <div>
            <h3>This is the dashboard</h3>
            <button type="button" onClick={handleClick}>
            Logout
            </button>          
        </div>
    );
}



export default withRouter(connect(null, {logout})(Dashboard))