import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './sidebar.css'


//TODO, add highlighting to element on sidebar when on certain url, EG: if on dashboard, then dashboard button on sidebar should be highlighted/accentuated
class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }


    check_path(path) {
        if (path === this.props.location.pathname) {
            return 'active_sidebar'
        } else {
            return null
        }
    }

    render() {
        return (
            <div className='sidebar'>
                <button onClick={()=> {this.props.history.replace('/dashboard')}}>Coinoutpost</button>
                <ul>
                    <li className={this.check_path('/dashboard')}><Link to='/dashboard'>Home</Link></li>
                    <li className={this.check_path('/holdings')}><Link to='/holdings'>Holdings</Link></li>

                </ul>
            </div>
        )
    }

    componentDidMount() {

    }
}

export default withRouter(Sidebar)