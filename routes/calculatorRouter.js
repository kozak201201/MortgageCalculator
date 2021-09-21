const router = require('express').Router();
const calculator = require('../controllers/calculatorController');

router.get('/', calculator.calculate);

module.exports = router;