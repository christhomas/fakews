export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_IAM_USER_COUNT':
            return {
                ...state,
                count: action.payload
            }

        default:
            return state
    }
}