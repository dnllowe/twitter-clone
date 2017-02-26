'use strict'

const db = require('./_db');
const sequelize = require('sequelize');

const Tweet = db.define("tweet", {
    content: {
        type: sequelize.STRING
    },

    hashTags: {
        type: sequelize.ARRAY(sequelize.STRING)
    }
});

module.exports = Tweet;