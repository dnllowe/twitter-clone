'use strict'

import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

import initialState from './initialState';

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, initialState, middleware);

//DEVELOPMENT ONLY. WILL ONLY WORK IN CHROME

// const store = createStore(
//   reducer, 
//   initialState, 
//   compose(
//     middleware,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && 
//     window.__REDUX_DEVTOOLS_EXTENSION__()
//   ) 
// );

export default store;
