const router = require('express').Router();

router.get('/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {res.json(req.user)});
router.get('/google/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;