app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile']}));
app.get('/api/auth/google/redirect', passport.authenticate('google'), (req, res) => {res.json(req.user)});
app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});