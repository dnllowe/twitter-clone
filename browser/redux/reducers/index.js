'use strict'

import {combineReducers} from 'redux';

import tweetReducer from './tweetReducer';
import uiReducer from './uiReducer';
import userReducer from './userReducer';
import inputReducer from './inputReducer';

const combinedReducers = combineReducers({tweets: tweetReducer, ui: uiReducer, user: userReducer, input: inputReducer});
export default combinedReducers;
