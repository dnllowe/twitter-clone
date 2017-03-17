'use strict'

const router = require('express').Router();
const userRouter = require('./users');
const tweetRouter = require('./tweets');

router.use('/users', userRouter);
router.use('/tweets', tweetRouter);

module.exports = router;

