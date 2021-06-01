import React from 'react'
import { Link } from 'react-router-dom'

const Splash = () => {
    return (
        <div>
            Testing
            <br/>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/signup">Sign up</Link>
        </div>
    )
}

export default Splash