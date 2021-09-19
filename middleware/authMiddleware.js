module.exports = function(req, res, next) {
    if (!req.user) {
        res.redirect('/api/auth/google');
    } else {
        next();
    }
}