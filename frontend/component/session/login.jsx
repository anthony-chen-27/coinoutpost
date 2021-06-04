import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../action/session_action'
import './session.css'
import Sessionheader from '../header/session_header'

const mSTP = ({errors}) => {
    return {
        errors: errors.session
    }
}

const clearErrors = () => {
    return {
        type: "CLEAR_SESSION_ERRORS"
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.demo = this.demo.bind(this)
    }

    renderErrors() {
        return(
          <ul>
            {this.props.errors.map((error, i) => (
              <li key={`error-${i}`}>
                {error}
              </li>
            ))}
          </ul>
        )
    }

    componentWillUnmount() {
        if (this.props.errors.length !== 0) {
            this.props.clearErrors()
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state)
    }

    update(field) {
        return (event) => {
            this.setState({[field] : event.target.value })
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => {if (e.key === 'Enter') {this.handleSubmit(e)}});
    }

    demo(e) {
        e.preventDefault()
        this.props.login({username: 'hello', password: 'testing'})
    }

    render() {
        return (
            <div className='session-body'>
                <Sessionheader />
                <div className='session-content'>
                    <div className='session-login-box'>
                        <div id='session-text'>Sign in to Coinoutpost</div>
                        <div className='session-login-form'>
                            <input style={{marginTop:30}}className='session-login-input' type="text" placeholder='Username' value={this.state.username} onChange={this.update('username')}/>
                            <input className='session-login-input' type="password" placeholder='Password' value={this.state.password} onChange={this.update('password')}/>
                            <div className='login-controls'>
                                <button onClick={this.demo}>DEMO USER</button>
                                <button onClick={this.handleSubmit}>SIGN IN</button>
                            </div>
                        </div>
                        <Link to='/signup'>Don't have an account?</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mSTP, {login, clearErrors})(Login)


