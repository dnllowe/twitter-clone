'use strict'

const db = require('./_db');
const User = require('./User');
const Tweet = require('./Tweet');

Tweet.belongsTo(User);
User.hasMany(Tweet);
User.belongsToMany(User, {as: 'subscription', through: 'follower-following'});


module.exports = {db, Tweet, User};