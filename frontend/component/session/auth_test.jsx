import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const mSTP = ({session, entities: { users }}) => {
    return {
        currentUser: users[session.id]
    }
}

const test = ({currentUser}) => {
    if (currentUser === undefined) {
        return (
            <div>
                Testing
                <br/>
                <Link to="/login">Login</Link>
                <br/>
                <Link to="/signup">Sign up</Link>
            </div>
            
        )
    } else {
        return (
            <div>
                <h2>Testing</h2>
                <h3>user_id: {currentUser.id}</h3>
                <h3>username: {currentUser.username}</h3>
            </div>
        )
    }
}

export default connect(mSTP, null)(test)