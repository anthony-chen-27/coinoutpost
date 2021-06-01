// Info here expects 2 args, username and password
export const login = (info) => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: {user: info}
    })
}

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "/api/session"
    })
}

// Info here expects 4 args, username, password, first_name, and last_name
export const signup = (info) => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: {user: info}
    })
}
