import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Splashheader from '../header/splash_header'
import './splash.css'
import {AiTwotoneSafetyCertificate, AiFillGithub, AiFillLinkedin} from 'react-icons/ai'
import {GiScrollUnfurled, GiFactory} from 'react-icons/gi'
import {RiBankLine} from 'react-icons/ri'
import {FaHandHoldingUsd, FaAngellist} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import {IconContext} from "react-icons"

const Splash = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            <Splashheader />
            <div className='splash_content'>
                <div className='splash-greeting-1'>
                    <span style={{fontSize: '32px', fontWeight: '600', marginBottom: '20px'}}>The most trusted cryptocurrency platoform</span>
                    <span style={{fontSize: '20px', color: '#5b616e', marginBottom: '60px'}}>Here are a few reasons why you should choose Coinoutpost</span>
                    <div className='splash-greeting-1-infographic'>
                        <div style={{width: '33.3%'}}>
                            <IconContext.Provider value={{style: {fill: '#0052ff', fontSize: '50px', marginBottom: '40px'}}}>
                                <AiTwotoneSafetyCertificate />
                            </IconContext.Provider>
                            <span className='sg1i-s1'>Secure storage</span>
                            <span className='sg1i-s2'>We store our digital assets in secure PostgreSQL database.</span>
                        </div>
                        <div style={{width: '33.3%'}}>
                            <IconContext.Provider value={{style: {fill: '#0052ff', fontSize: '50px', marginBottom: '40px'}}}>
                                <GiScrollUnfurled />
                            </IconContext.Provider>
                            <span className='sg1i-s1'>Protected by word</span>
                            <span className='sg1i-s2'>Cryptocurrency stored on our website is protected by our word</span>
                        </div>
                        <div style={{width: '33.3%'}}>
                            <IconContext.Provider value={{style: {fill: '#0052ff', fontSize: '50px', marginBottom: '40px'}}}>
                                <GiFactory />
                            </IconContext.Provider>
                            <span className='sg1i-s1'>Industry best practices</span>
                            <span className='sg1i-s2'>Coinoutpost supports a whopping 19 different digital currencies</span>
                        </div>
                    </div>
                </div>
                <div className='splash-info-1'>
                    <div>
                        <span>$200B</span>
                        <span>Annual volume traded</span>
                    </div>
                    <div>
                        <span>100+</span>
                        <span>Countries supported</span>
                    </div>
                    <div>
                        <span>50+M</span>
                        <span>Verified traders</span>
                    </div>
                </div>
                <div className='splash-greeting-2'>
                    <span style={{fontSize: '32px', fontWeight: '600', marginBottom: '20px'}}>Get started in a few minutes</span>
                    <span style={{fontSize: '20px', color: '#5b616e', marginBottom: '60px'}}>Coinoutpost supports a variety of the most popular digital currencies.</span>
                    <div className='sg2-box'>
                        <div className='sg2-icon'>
                            <IconContext.Provider value={{style: {fill: '#0052ff', fontSize: '50px', marginBottom: '20px'}}}>
                                <ImProfile />
                            </IconContext.Provider>
                            <span>Create an account</span>
                        </div>
                        <div className='sg2-line'></div>
                        <div className='sg2-icon'>
                            <IconContext.Provider value={{style: {fill: '#0052ff', fontSize: '50px', marginBottom: '20px'}}}>
                                <RiBankLine />
                            </IconContext.Provider>
                            <span>Link your bank account</span>
                        </div>
                        <div className='sg2-line'></div>
                        <div className='sg2-icon'>
                            <IconContext.Provider value={{style: {fill: '#0052ff', fontSize: '50px', marginBottom: '20px'}}}>
                                <FaHandHoldingUsd />
                            </IconContext.Provider>
                            <span>{'Start buying & selling'}</span>
                        </div>
                    </div>
                </div>
                <div className='splash-footer'>
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
        </div>
    )
}

export default Splash