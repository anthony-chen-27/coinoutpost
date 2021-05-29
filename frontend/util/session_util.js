export const login = (info) => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: info
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
        data: info
    })
}
