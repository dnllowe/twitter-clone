'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';

import AppContainer from './containers/AppContainer';
import SingleTweetPageContainer from './containers/SingleTweetPageContainer';
import HomePage from './components/HomePage';
import RelatedTweetsPageContainer from './containers/RelatedTweetsPageContainer';
import UserPageContainer from './containers/UserPageContainer';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={AppContainer}>
            <IndexRedirect to='/home' />
            <Route path='/home' component={HomePage} />
            <Route path='/tweets/:tweetId' component={SingleTweetPageContainer} />
            <Route path='/tweets/related/:hashTag' component={RelatedTweetsPageContainer} />
            <Route path='/user/:username' component={UserPageContainer} />
        </Route>
    </Router>,
    document.getElementById('app')
);
