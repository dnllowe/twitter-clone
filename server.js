'use strict'

const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const router = require('./routes');
const bodyParser = require('body-parser');
const { db } = require('./models');
const morgan = require('morgan');
const session = require('express-session');

// MIDDLEWARE

// Logging (only in dev mode)
if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
}

// Sessions
app.use(session({
    secret: 'orbital',
    resave: false,
    saveUninitialized: false
}));

// Needed to parse POST requests from HTML forms
app.use(bodyParser.urlencoded({extended: true}));

// Needed to parse POST requests from AJAX requests
app.use(bodyParser.json());

app.use('/api', router);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.use('/bootstrap/css/bootstrap.min.css', express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
app.use('/react.min.js', express.static(__dirname + '/node_modules/react/dist/react.min.js'));
app.use('/reactDom.min.js', express.static(__dirname + '/node_modules/react-dom/dist/react-dom.min.js'));


// This says, for any route aside from the home route, send the index.html file back
// Now, React Router will handle all routes by parsing the index.html, and looking for the appropriate
// Route to draw the specified components
app.use(function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Only start server if main module
if (module === require.main) {
    db.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening on port: " + PORT);
        });
    })
    .catch(console.err);
}

module.exports = app