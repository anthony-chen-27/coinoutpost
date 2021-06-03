import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import './header.css'


const Splashheader = () => {
    const hist = useHistory()
    return (
        <header className="splash-header">
            <div className="splash-header-content">
                {/* <Link to='/'>Coinoutpost</Link> */}
                <button className='splash-home-button' onClick={() => hist.replace('/')}>coinoutpost</button>
                <div className='splash-session'>
                    <Link id='sign-in-btn' to="/login">Sign in</Link>
                    <Link id='sign-up-btn' to="/signup">Sign up</Link>
                </div>
            </div>
        </header>
    )
}

export default Splashheader