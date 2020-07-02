import { Auth } from 'aws-amplify'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export const requestUser = () => {
    return {
        type: REQUEST_USER
    }
}
export const receiveUser = (userData) => {
    return {
        type: RECEIVE_USER,
        userData
    }
}

export const fetchUser = () => {
    
    return (dispatch) => {

        dispatch(requestUser())

        return Auth.currentUserInfo()
            .then(
                response => response.username
            )
            .then(
                username => dispatch(receiveUser(username))
            )

    }
}