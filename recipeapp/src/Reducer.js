export const initialState = {
    recipe: '',
    session: false,

}

function reducer(initialState, action) {
    switch (action.type) {
        case 'send':
            return { ...initialState, recipe: action.value }
        case 'isloggedin':
            return { ...initialState, session: action.value }
        default:
            return initialState
    }
}

export default reducer