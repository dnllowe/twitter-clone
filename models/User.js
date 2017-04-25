'use strict'

const db = require('./_db');
const sequelize = require('sequelize');
const Tweet = require('./Tweet');
const bcrypt = require('bcryptjs')

const saltRounds = 10

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
    password_hash: {
        type: sequelize.STRING,
        allowNll: false
    },
    password: {
        type: sequelize.VIRTUAL,
    }
}, {
    hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
    },
    getterMethods: {
        handle: function() { return '@' + this.username; },
        fullname: function() { return this.firstname + ' ' + this.lastname; }
    },
    instanceMethods: {
        getTweets: function() {
            Tweet.findAll({
                where: {
                    id: this.id
                }
            })
        },

        // NOTE: this returns a promise. Must check for validity in .then statement
        checkPassword: function (password) {
            console.log(this, password)
            return bcrypt.compare(password, this.password_hash)
        }
    }
});

function hashPassword(user) {

    return bcrypt.hash(user.password, saltRounds)
    .then((hashedPassword) => {
        user.set('password_hash', hashedPassword)
    })
}

module.exports = User;