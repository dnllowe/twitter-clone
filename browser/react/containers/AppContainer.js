// NODE MODULES
import React, {cloneElement} from 'react';
import axios from 'axios';
import Transition from 'react-addons-css-transition-group';


// COMPONENTS
import TweetDisplay from '../components/TweetDisplay';
import NavigationBar from '../components/NavigationBar';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import HamburgerMenuContainer from '../containers/HamburgerMenuContainer';
import Intro from '../components/Intro';
import checkLoggedInUser from '../../redux/action-creators/checkLoggedInUser';

// REDUX
import store from '../../redux/store';
import initialState from '../../redux/initialState';
import logout from '../../redux/action-creators/logoutUser';
import loadTweets from '../../redux/action-creators/loadTweets';
import loadHashtags from '../../redux/action-creators/loadHashtags';

// CUSTOM MODULES
import layout from '../../../public/js/layoutUtility';

class AppContainer extends React.Component {

  constructor() {
    super();
    this.state = store.getState();
  }

  // Load all tweets after initial render
  componentDidMount() {

    store.dispatch(loadTweets('/api/tweets/latest/0/5'));
    store.dispatch(loadHashtags('/api/tweets/hashtags/popular/0/10'));

    // Update state every time redux store changes state
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

    // Check server to see if verified user on session exists
    store.dispatch(checkLoggedInUser());

    // Resize any fixed position elements with wrappers
    layout.resizeFixedWrappers();
    // Call again after a small delay to make sure HTML assets have rendered
    setTimeout(layout.resizeFixedWrappers, 10);
    layout.addResizeFixedWrappersListener();
  }

  componentWillUnmount() {
    layout.removeResizeFixedWrappersListener();
    this.unsubscribe();
  }

  render() {
    
    // PREPARATION FOR DYNAMIC LOGOUT BUTTON
    const user = this.state.user.loggedInUser;
    const loggedIn = user !== null ? true : false;
    const name = loggedIn ? user.firstname : null;
    let hamburgerMenuLinks = [...this.state.ui.navigationLinks];
    if(loggedIn) {
      hamburgerMenuLinks.push(
        {text: 'Logout', url: '#', callbacks: [() => {store.dispatch(logout())}]} // Provide function that *calls* logout to avoid immediately invoking it
      );
    }

    return (
      <div>
        <div className='hidden-xs'>
          <NavigationBar
            links={this.state.ui.navigationLinks}
            loggedIn={loggedIn}
            name={name}
          />
        </div>

        <div className='hidden-sm hidden-md hidden-lg'>
          <HamburgerMenuContainer 
            links={hamburgerMenuLinks}
            loggedIn={loggedIn}/>
        </div>

        {this.props.children && 
         cloneElement(this.props.children, {
           currentTweets: this.state.tweets.currentTweets,
           currentHashtags: this.state.tweets.currentHashtags,
           prompt: this.state.ui.prompt,
           selectedTweet: this.state.tweets.selectedTweet,
           selectedUser: this.state.user.selectedUser,
           loggedInUser: this.state.user.loggedInUser,
           navigationLinks: this.state.ui.navigationLinks,
           isSignupDisplaying: this.state.ui.isSignupDisplaying})
        } 
         
      </div>
    );
  }
}

export default AppContainer;