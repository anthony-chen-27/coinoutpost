import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../action/session_action'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''}
        this.handleSubmit = this.handleSubmit.bind(this)

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
        )
    }
}

export default connect(null, {login})(Login)


