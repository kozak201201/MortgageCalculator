require('dotenv').config();
require('./config/passport-setup');

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

require('./models/models');
const db = require('./db');
const passport = require('passport');
const indexRouter = require('./routes/indexRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+'/views'))
app.use('/', indexRouter);

(async() => {
    await db.authenticate();
    await db.sync();

    app.listen(PORT, () => {
        console.log(`Server has been started on ${PORT} port`);
    });
})();