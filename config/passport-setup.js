const passport = require('passport');
const {Strategy} = require('passport-google-oauth20');
const { User } = require('../models/models');

passport.serializeUser((user,done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    User.findByPk(user.id, {raw: true}).then(user => {
        done(null, user);
    })
})

passport.use(new Strategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
    User.findByPk(profile.id, {raw:true}).then(user => {
        if (user) {
            done(null, user);
        } else {
            User.create({id: profile.id, name: profile.displayName}).then(user => {
                user = user.getDataValue();
                done(null, user);
            });
        }
    });
}));