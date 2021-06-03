import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Splashheader from '../header/splash_header'
import './splash.css'

const Splash = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Splashheader />
            <div className='splash_content'>
                Content goes here
            </div>
        </div>
    )
}

export default Splash