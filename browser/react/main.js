'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import store from '../redux/store';

import setAllUsers from '../redux/action-creators/setAllUsers';

import AppContainer from './containers/AppContainer';
import SingleTweetPageContainer from './containers/SingleTweetPageContainer';
import HomePage from './components/HomePage';
import RelatedTweetsPageContainer from './containers/RelatedTweetsPageContainer';
import UserPageContainer from './containers/UserPageContainer';

const appOnEnter = () => {
    store.dispatch(setAllUsers());
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={AppContainer} onEnter={appOnEnter}>
            <IndexRedirect to='/home' />
            <Route path='/home' component={HomePage} />
            <Route path='/tweets/:tweetId' component={SingleTweetPageContainer} />
            <Route path='/tweets/related/:hashTag' component={RelatedTweetsPageContainer} />
            <Route path='/user/:username' component={UserPageContainer} />
        </Route>
    </Router>,
    document.getElementById('app')
);
