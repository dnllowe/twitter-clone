// NODE MODULES
import React, {cloneElement} from 'react';
import axios from 'axios';
import store from '../../redux/store';

// COMPONENTS
import TweetDisplay from '../components/TweetDisplay';
import NavigationBar from '../components/NavigationBar';
import HamburgerMenu from '../components/HamburgerMenu';
import Intro from '../components/Intro';
import checkLoggedInUser from '../../redux/action-creators/checkLoggedInUser';

// USING REQUIRE TO GET MORE USEFUL LINTING
import initialState from '../../redux/initialState';

// CUSTOM MODULES
import layoutUtility from '../../../public/js/layoutUtility';

class AppContainer extends React.Component {

  constructor() {
    super();
    this.state = store.getState();
    this.layout = new layoutUtility();
  }

  // Load all tweets after initial render
  componentDidMount() {

    // Update state every time redux store changes state
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

    // Check server to see if verified user on session exists
    store.dispatch(checkLoggedInUser());

    // Resize any fixed position elements with wrappers
    this.layout.resizeFixedWrappers();
    // Call again after a small delay to make sure HTML assets have rendered
    setTimeout(this.layout.resizeFixedWrappers, 10);
    this.layout.addResizeFixedWrappersListener();
  }

  componentWillUnmount() {
    this.layout.removeResizeFixedWrappersListener();
    this.unsubscribe();
  }

  render() {
    
    // PREPARATION FOR DYNAMIC LOGOUT BUTTON
    const user = this.state.user.loggedInUser;
    const loggedIn = user !== null ? true : false;
    const name = loggedIn ? user.firstname : null;

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
          <HamburgerMenu
            links={this.state.ui.navigationLinks}
            loggedIn={loggedIn}
            name={name}
          />
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