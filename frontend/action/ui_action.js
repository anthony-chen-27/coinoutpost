export const updateUi = (bool) => {
    return {
        type: "UPDATE_UI",
        loading: bool
    }
}