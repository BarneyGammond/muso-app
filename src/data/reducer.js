export default (state, action) => {
    switch (action.type) {
        case "ADD_API_TOKEN": return {
            ...state,
            apiToken: action.apiToken
        }
        default: return state;
    }
};