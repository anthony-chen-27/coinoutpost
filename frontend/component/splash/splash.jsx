import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
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
                Testing
                <br/>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>
                <Modal show={show} onHide={handleClose} size="sm">
                    <Modal.Body>
                        <h4>Edit Item</h4>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default Splash