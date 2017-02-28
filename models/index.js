'use strict'

const db = require('./_db');
const User = require('./User');
const Tweet = require('./Tweet');

Tweet.belongsTo(User);
User.hasMany(Tweet);

// This is for getting / setting who a user follows
User.belongsToMany(User, {as: 'subscription', through: 'UserSubscription'});

// This is for getting / setting a user's followers
User.belongsToMany(User, {as: 'follower', through: 'UserFollower'});

module.exports = {db, Tweet, User};