import axios from 'axios';
import actions from '../actions';


const setAllUsers = (allUsers) => {
  return {
    type: actions.SET_ALL_USERS,
    allUsers
  }
}

const fetchAllUsers = () => {
  return (dispatch) => {
    return axios.get('/api/users/all')
      .then(res => res.data)
      .then((allUsers) => {
        dispatch(setAllUsers(allUsers));
      })
      .catch(console.error);
  }
}

export default fetchAllUsers;