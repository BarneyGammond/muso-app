import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './css/reset.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import reducer from './data/reducer'
Amplify.configure(config)

const initial = {};

const store = createStore(
    reducer, 
    initial,
    window.__REDUX_DEVTOOLS_EXTENSION__ 
        && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render( 
    <Provider store={ store }> 
        <App 
            handleApiToken={ (apiToken) => store.dispatch({
                type: "ADD_API_TOKEN",
                apiToken
            }) }
            apiToken={ store.getState() }
        /> 
    </Provider>, 
    document.getElementById("root"), 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
