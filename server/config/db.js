const pgp = require('pg-promise')();

const config = {
	host: 'database',
	port: 5432,
	database: 'camagru',
	user: 'user123',
	password: 'pass123',
};
const db = pgp(config);

module.exports = db;