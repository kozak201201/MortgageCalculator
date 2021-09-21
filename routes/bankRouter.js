const router = require('express').Router();
const bankController = require('../controllers/bankController');

router.post('/', bankController.create);
router.put('/:id', bankController.update);
router.delete('/:id', bankController.delete);

module.exports = router;