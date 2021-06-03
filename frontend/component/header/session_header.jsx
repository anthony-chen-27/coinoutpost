import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './header.css'


const Sessionheader = () => {
    const hist = useHistory()
    return (
        <header className="session-header">
            <div className="splash-header-content">
                {/* <Link to='/'>Coinoutpost</Link> */}
                <button className='session-home-button' onClick={() => hist.replace('/')}>coinoutpost</button>
                <div className='splash-session'>
                    <Link id='session-sign-in-btn' to="/login">Sign in</Link>
                    <Link id='session-sign-up-btn' to="/signup">Sign up</Link>
                </div>
            </div>
        </header>
    )
}

export default Sessionheader