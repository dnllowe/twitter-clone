'use strict';
import React from 'react';

const UserPage = (props) => {

  return (
    <div>
      {props.user.username}
    </div>
  );
}

export default UserPage;
