require('dotenv').config();
const express = require('express');
const path = require('path');

// Databases
require('./db/sequelize');

const app = express();
const { user: UserModel } = require('./db/sequelize');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.route('/').get(async (req, res) => {
    try {
        const users = await UserModel.findAll({ logging: console.log });
        res.render('index', { users });
    } catch (e) {
        throw e;
    }
});

const port = process.env.NODEJS_LOCAL_PORT || 4000;
app.listen(port, () => {
	console.log(`Worker: process ${process.pid} is up on port ${port}`);
});
