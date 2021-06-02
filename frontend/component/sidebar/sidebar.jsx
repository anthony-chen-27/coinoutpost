import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        console.log(this.props)
        return (
            <div className='sidebar'>
                <ul>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/holdings'>Holdings</Link></li>
                </ul>
            </div>
        )
    }

    componentDidMount() {

    }
}

export default withRouter(Sidebar)