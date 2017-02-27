'use strict'

const Promise = require('bluebird');
const db = require('./models');
const User = db.User;
const Tweet = db.Tweet;

console.log(User);

const users = [
    {username: 'fakeUser', password: 'password', firstname: 'Fake', lastname: 'User'},
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
    {username: 'testPerson', password: 'password', firstname: 'H.J.', lastname:'Osment' },
    {username: 'testTwo', password: 'password', firstname:'Cid' , lastname:'Data' },
    {username: 'userTwo', password: 'password', firstname: 'Mack', lastname: 'Sheen'},
    {username: 'dummyTwo', password: 'password', firstname: 'Con', lastname:'Pewter' },
    {username: 'personTwo', password: 'password', firstname: 'Ally', lastname:'Es' },
    {username: 'notARealUser', password: 'password', firstname: 'Fission', lastname: 'Mailed'},
    {username: 'notARealAccount', password: 'password', firstname: 'At', lastname:'At' },
    {username: 'notARealPerson', password: 'password', firstname: 'Hal', lastname: '9000'}
];

const tweets = [
    {content: 'This is a fake tweet', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'The weather is nice, today', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'Sign me up for testing', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'The Falcons lost :(', hashTags: ['#cool', '#random', '#coding']},
    {content: 'Coding is fun', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'Making seed data is not fun', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'Hopefully Twitter won\'t sue', hashTags: ['#cool', '#awesome', '#coding']},
    {content: 'Another fake tweet', hashTags: ['#super', '#nice', '#coding']},
    {content: 'Braid is one of the best games of all time', hashTags: ['#random', '#nice', '#coding']},
    {content: 'True Detective Season One is epic', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'The Matrix vs Inception... tough call', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'What am I supposed to be tweeting about?', hashTags: ['#cool', '#random', '#coding']},
    {content: 'Hashtag hashtags are cool', hashTags: ['#cool', '#funny', '#coding']},
    {content: 'Node.js for the win', hashTags: ['#cool', '#funny', '#coding']},
    {content: 'Is it Friday, yet?', hashTags: ['#cool', '#nice', '#great']},
    {content: 'This portfolio is kinda nice, right?', hashTags: ['#cool', '#nice', '#coding']},
    {content: 'Google Tap 3 / Tap 3 Tiles', hashTags: ['#cool', '#awesome', '#coding']},
    {content: 'Ever heard of Out of Orbit Games?', hashTags: ['#super', '#nice', '#coding']},
    {content: 'Almost there...', hashTags: ['#awesome', '#nice', '#great']},
    {content: 'C\'est finit', hashTags: ['#cool', '#nice', '#coding']},

];

db.db.sync({force: true})
.then(() => {
    console.log("Fininshed syncing datbase", "Old data removed");
    return User.bulkCreate(users)
})
.then((users) => {
    console.log("Created new Users data");
    return Tweet.bulkCreate(tweets); // NOTE: Does NOT return newly created rows
})
.then(() => {
    // MUST QUERY FOR ALL TWEETS HERE AGAIN
    return Tweet.findAll();
}).then((tweets) => {
    console.log("Created new Tweets data. Assigning to users");
    let iii = 1;
    const promises = [];
    tweets.forEach((tweet) => {
        promises.push(tweet.setUser(iii));
        iii++;
    });

    return Promise.all(promises);
})
.then(() => {
    return User.findAll();
    console.log("Finished updating database");
})
.then(users => {
    users.forEach((user) => {
        if(user.id !== 5) {
            user.addSubscription(5);
        }
    });
})
.catch(console.err);