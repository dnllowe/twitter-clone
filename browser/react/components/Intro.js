import React from 'react';
import {Link} from 'react-router';

import UserForm from '../components/UserForm';

const Intro = () => {

  return (
    <div>

      <div>
        <h1>Twitter Clone</h1>
        <img
          src='img/twitter-clone-logo.png'
          className='fade-in-slide-up-faster'
          style={{maxWidth: '50%'}}
        />
      </div>

      <div>
        <UserForm />
        <br/>
      </div>
    </div>
  );
}

export default Intro;