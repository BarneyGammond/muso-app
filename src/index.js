import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './css/reset.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import reducer from './data/reducer'
Amplify.configure(config)

const initial = {
    user: {
        isFetching: false,
        username: null
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    initial,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);

ReactDOM.render( 
    <Provider store={ store }> 
        <App 
            handleApiToken={ apiToken => store.dispatch({
                type: "ADD_API_TOKEN",
                apiToken
            }) }
        /> 
    </Provider>, 
    document.getElementById("root"), 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
