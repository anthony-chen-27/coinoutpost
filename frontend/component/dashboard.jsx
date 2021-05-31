import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from '../action/session_action'

function HomeButton() {
    const history = useHistory();
  
    function handleClick() {
      history.push("/");
    }
  
    return (
      <button type="button" onClick={handleClick}>
        Go home
      </button>
    );
}

const mSTP = ({session, entities: { users }}) => {
    return {
        currentUser: users[session.id]
    }
}


const Dashboard = (props) => {
    const history = useHistory();

    function handleClick() {
        props.logout()
    }

    return (
        <div>
            <h3>This is the dashboard</h3>
            <button type="button" onClick={handleClick}>
            Go home
            </button>          
        </div>
    );
}

// export default HomeButton

export default connect(null, {logout})(Dashboard)