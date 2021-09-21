const router = require('express').Router();

const bankRouter = require('./bankRouter');
const calculatorRouter = require('./calculatorRouter');
const authMiddleware = require('../middleware/authMiddleware');

router.use('/banks', authMiddleware, bankRouter);
router.use('/calculator', calculatorRouter);

module.exports = router;