const router = require('express').Router();

const authRouter = require('./authRouter');
const apiRouter = require('./apiRouter');
const ejsRouter = require('./ejsRouter');

router.use('/api', apiRouter);
router.use('/auth', authRouter);
router.use('/', ejsRouter);

module.exports = router;