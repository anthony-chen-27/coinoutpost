import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../action/session_action'

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

    render() {
        return (
            <div>
                <div><Link to='/'><h1>Coinoutpost</h1></Link></div>
                <form>
                    <label> Username
                        <input type="text" value={this.state.username} onChange={this.update('username')}/>
                    </label>
                    <br/>
                    <label> Password
                        <input type="text" value={this.state.password} onChange={this.update('password')}/>
                    </label>
                    <br/>
                    <button onClick={this.handleSubmit}>Log In</button>
                </form>
                {this.renderErrors()}
            </div>
        )
    }
}

export default connect(mSTP, {login, clearErrors})(Login)


