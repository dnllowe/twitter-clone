'use strict'

const sequelize = require('sequelize');
const db = new sequelize('postgres://localhost/twitter-clone', {logging: false});

module.exports = db;