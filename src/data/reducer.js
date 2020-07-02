import { REQUEST_USER, RECEIVE_USER } from '../data/actions'

export default (state, action) => {
    switch (action.type) {
        case REQUEST_USER: return {
            ...state,
            user: {
                ...state.user,
                isFetching: true,
            }
        }
        case RECEIVE_USER: return {
            ...state,
            user: {
                ...state.user,
                isFetching: false,
                username: action.userData
            }
        }
        case "ADD_API_TOKEN": return {
            ...state,
            apiToken: action.apiToken
        }
        default: return state;
    }
};