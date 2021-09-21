const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

router.get('/calculator', (req, res) => {
    res.render('calculator');
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/update', (req, res) => {
    res.render('update');
});

router.get('/delete', (req, res) => {
    res.render('delete');
});

module.exports = router;