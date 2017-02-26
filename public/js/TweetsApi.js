'use strict';
import axios from 'axios';

class TweetsApi {
  
  /**
   * Returns are promise containing the latest twets
   * @param {Number} time how long ago in ms to retrieve tweets. 
   * 0 by default returns tweets regardless of createdAt time
   * @param {Number} limit how many tweets to retrieve. 
   * 0 by default returns all tweets
   */
  getLatestTweets(time = 0, limit = 0) {
    return axios.get(`/api/tweets/latest/${time}/${limit}`)
    .then(res => res.data)
  }

  /**
   * Returns are promise containing the latest twets
   * @param {Number} time how long ago in ms to retrieve hashtags. 
   * 0 by default returns hashtags regardless of createdAt time
   * @param {Number} limit how many hashtags to retrieve. 
   * 0 by default returns all hashtags
   */
  getTopHashtags(time = 0, limit = 0) {
    return axios.get(`/api/tweets/hashtags/popular/${time}/${limit}`)
    .then(res => res.data);
  }
}

export default new TweetsApi();