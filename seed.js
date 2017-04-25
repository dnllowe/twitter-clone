'use strict'

const Promise = require('bluebird');
const db = require('./models');
const User = db.User;
const Tweet = db.Tweet;

const usersSeed = [
    {username: 'fakeUser', password: 'password', firstname: 'Fake', lastname: 'User', subscriptionId: 2},
    {username: 'testUser', password: 'password', firstname: 'Smarter', lastname: 'Child'},
    {username: 'fakeAccount', password: 'password', firstname: 'Imma', lastname: 'Bot'},
    {username: 'dummyUser', password: 'password', firstname: 'Im', lastname: 'Poster'},
    {username: 'dummyAccount', password: 'password', firstname: 'Paranoid', lastname: 'Android'},
    {username: 'testAccount', password: 'password', firstname: 'Un', lastname: 'Real'},
    {username: 'dummyOne', password: 'password', firstname: 'Fig', lastname: 'Mint'},
    {username: 'userOne', password: 'password', firstname: 'Emagine', lastname: 'Nation'},
    {username: 'testOne', password: 'password', firstname: 'Beta', lastname: 'Tester'},
    {username: 'fakePerson', password: 'password', firstname: 'Q', lastname: 'A'},
    {username: 'personOne', password: 'password', firstname: 'Rob', lastname: 'Bot'},
    {username: 'dummyPerson', password: 'password', firstname: 'A', lastname: 'I'},
    {username: 'testPerson', password: 'password', firstname: 'H.J.', lastname: 'Osment' },
    {username: 'testTwo', password: 'password', firstname: 'Cid', lastname: 'Data' },
    {username: 'userTwo', password: 'password', firstname: 'Mack', lastname: 'Sheen'},
    {username: 'dummyTwo', password: 'password', firstname: 'Con', lastname: 'Pewter' },
    {username: 'personTwo', password: 'password', firstname: 'Ally', lastname: 'Es' },
    {username: 'notARealUser', password: 'password', firstname: 'Fission', lastname: 'Mailed'},
    {username: 'notARealAccount', password: 'password', firstname: 'At', lastname: 'At' },
    {username: 'notARealPerson', password: 'password', firstname: 'Hal', lastname: '9000'}
];

const tweetsSeed = [
    {content: 'This is a fake tweet #cool #nice #coding', hashTags: ['#cool']},
    {content: 'The weather is nice, today #nice', hashTags: ['#nice']},
    {content: 'Sign me up for testing #coding', hashTags: ['#coding']},
    {content: 'The Falcons lost :( #random', hashTags: ['#random']},
    {content: 'Coding is fun #cool #coding #nice', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'Making seed data is not fun #coding', hashTags: ['#coding']},
    {content: 'Hopefully Twitter won\'t sue #awesome', hashTags: ['#awesome']},
    {content: 'Another fake tweet #testing #super', hashTags: ['#super', '#testing']},
    {content: 'Braid is one of the best games of all time #random #nice', hashTags: ['#random', '#nice']},
    {content: 'True Detective Season One is epic #cool #nice', hashTags: ['#cool', '#nice']},
    {content: 'The Matrix vs Inception... tough call #cool #nice', hashTags: ['#cool', '#nice']},
    {content: 'What am I supposed to be tweeting about? #random', hashTags: ['#random']},
    {content: 'Hashtag hashtags are cool #hashtag #funny', hashTags: ['#hashtag', '#funny']},
    {content: 'Node.js for the win #cool #coding #funny', hashTags: ['#cool', '#funny', '#coding']},
    {content: 'Is it Friday, yet? #cool #nice #great', hashTags: ['#cool', '#nice', '#great']},
    {content: 'This portfolio is kinda nice, right? #cool #nice #coding', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'Google Tap 3 / Tap 3 Tiles #awesome #coding #games', hashTags: ['#awesome', '#coding', '#games']},
    {content: 'Ever heard of Out of Orbit Games? #super #coding #games', hashTags: ['#super', '#coding', '#games']},
    {content: 'Almost there... #awesome #done #great', hashTags: ['#awesome', '#done', '#great']},
    {content: 'C\'est finit #done', hashTags: ['#done']},

];

db.db.sync({force: true})
.then(() => {
    console.log('Fininshed syncing datbase', 'Old data removed');
    const promises = usersSeed.map(user => User.create(user))
    return Promise.all(promises)
})
.then(() => {
    console.log('Created new Users data');
    return Tweet.bulkCreate(tweetsSeed); // NOTE: Does NOT return newly created rows
})
.then(() => {
    // MUST QUERY FOR ALL TWEETS HERE AGAIN
    return Tweet.findAll();
})
.then((createdTweets) => {
    console.log('Created new Tweets data. Assigning to users');
    let iii = 1;
    const promises = [];
    createdTweets.forEach((tweet) => {
        promises.push(tweet.setUser(iii));
        iii++;
    });

    return Promise.all(promises);
})
.then(() => {
    console.log('Finished updating database');
    return User.findAll();
})
.then(createdUsers => {
    createdUsers.forEach((user) => {
        if (user.id !== 1) {
            user.addSubscription(1);
            createdUsers[0].addFollower(user);
        }
    });
})
.catch(console.err);
