const router = require('express').Router();

const authRouter = require('./authRouter');
const bankRouter = require('./bankRouter');
const authMiddleware = require('../middleware/authMiddleware');

router.use('/auth', authRouter);
router.use('/banks', authMiddleware, bankRouter);

module.exports = router;