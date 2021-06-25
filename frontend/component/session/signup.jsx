import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signup, login } from '../../action/session_action'
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


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: '', first_name: '', last_name: ''}
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
        let tmp = Object.assign({}, this.state)
        tmp.first_name = tmp.first_name[0].toUpperCase() + tmp.first_name.substring(1);
        tmp.last_name = tmp.last_name[0].toUpperCase() + tmp.last_name.substring(1);
        this.props.signup(this.state)
    }

    update(field) {
        return (event) => {
            this.setState({[field] : event.target.value})
        }
    }

    demo(e) {
        e.preventDefault()
        this.props.login({username: 'hello', password: 'testing'})
    }

    render() {
        const disabled = Object.values(this.state).filter(w => w === '').length !== 0
        return (
            <div className='session-body'>
                <Sessionheader />
                <div className='session-content'>
                    <div className='session-login-box'>
                        <div id='session-text'>Create your account</div>
                        <div className='session-signup-form'>
                            <div className='signup-name'>
                                <input type="text" placeholder='First name' value={this.state.first_name} onChange={this.update('first_name')}/>
                                <input type="text" placeholder='Last name' value={this.state.last_name} onChange={this.update('last_name')}/>
                            </div>
                            <input style={{marginTop:0}}className='session-signup-input' type="text" placeholder='Username' value={this.state.username} onChange={this.update('username')}/>
                            <input className='session-signup-input' type="password" placeholder='Choose password' value={this.state.password} onChange={this.update('password')}/>
                            <button style={{marginBottom: 16, marginTop:16}} onClick={this.handleSubmit} disabled={disabled} className='session-signup-btn'>Create account</button>
                            <button onClick={this.demo} className='session-signup-btn'>Demo user</button>
                        </div>
                        <div className='redirect-to-login'>Already have a Coinoutpost account? <Link to='/login'>Log in</Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mSTP, {signup, clearErrors, login})(Signup)


