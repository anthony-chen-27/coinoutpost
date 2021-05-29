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

export const signup = (info) => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: {user: info}
    })
}
