const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {res.json(req.user)});
router.get('/google/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;