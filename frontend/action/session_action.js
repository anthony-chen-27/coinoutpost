import * as sessionUtil from "../util/session_util"


export const receiveErrors = errors => ({
    type: "RECEIVE_SESSION_ERRORS",
    errors
  });

export const login = (info) => (dispatch) => {
    sessionUtil.login(info).then(
        user => dispatch({type: "RECEIVE_CURRENT_USER", user}),
        err => dispatch(receiveErrors(err.responseJSON))
    )
}

export const logout = () => (dispatch) => {
    sessionUtil.logout().then(
        user => dispatch({type: "LOGOUT_CURRENT_USER"}),
        err => dispatch(receiveErrors(err.responseJSON))
    )
}

export const signup = (info) => (dispatch) => {
    sessionUtil.signup(info).then(
        user => dispatch({type: "RECEIVE_CURRENT_USER", user}),
        err => dispatch(receiveErrors(err.responseJSON))
    )
}