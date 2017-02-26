'use strict'

const db = require('./_db');
const sequelize = require('sequelize');
const Tweet = require('./Tweet');

const User = db.define('user', {
    firstname: {
        type: sequelize.STRING,
        allowNull: false
    },

    lastname: {
        type: sequelize.STRING,
        allowNull: false
    },

    username: {
        type: sequelize.STRING,
        allowNull: false
    },

    password: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
    getterMethods: {
        handle: function() {
            return '@' + this.username;
        },

        fullname: function() {
            return this.firstname + ' ' + this.lastname;
        }
    },

    instanceMethods: {
        getTweets: function() {
            Tweet.findAll({
                where: {
                    id: this.id
                }
            })
        }
    }
}
);

module.exports = User;