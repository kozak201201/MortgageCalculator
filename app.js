require('dotenv').config();

const express = require('express');
const cors = require('cors');

const db = require('./db');
require('./models/models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async() => {
    await db.authenticate();
    await db.sync({force: true});

    app.listen(PORT, () => {
        console.log(`Server has been started on ${PORT} port`);
    });
})();