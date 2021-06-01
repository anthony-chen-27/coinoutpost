import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../../action/session_action'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: '', first_name: '', last_name: ''}
        this.handleSubmit = this.handleSubmit.bind(this)

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
                <label> First Name
                    <input type="text" value={this.state.first_name} onChange={this.update('first_name')}/>
                </label>
                <label> Last Name
                    <input type="text" value={this.state.last_name} onChange={this.update('last_name')}/>
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Sign up</button>
            </form>
        )
    }
}

export default connect(null, {signup})(Signup)


