import { REQUEST_USER, RECEIVE_USER } from '../data/actions'

export default (state, action) => {
    switch (action.type) {
        case REQUEST_USER: return {
            ...state,
            user: {
                ...state.user,
                isFetching: true,
                data: 'none'
            }
        }
        case RECEIVE_USER: return {
            ...state,
            user: {
                ...state.user,
                isFetching: false,
                data: action.userData
            }
        }
        case "ADD_API_TOKEN": return {
            ...state,
            apiToken: action.apiToken
        }
        default: return state;
    }
};