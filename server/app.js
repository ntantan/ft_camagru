const express = require('express');
const router = express.Router();
const { errors } = require('pg-promise');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

const user_routes = require('./routes/user');
app.use('/users', user_routes);

module.exports = app;