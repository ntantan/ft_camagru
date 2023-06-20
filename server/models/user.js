const db = require('../config/db');

const User = {
	create: (username, email, password) => {
		return db.none('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
	},

	getAll: () => {
		return db.many('SELECT * FROM users');
	},

	getById: (id) => {
		return db.one('SELECT * FROM users WHERE id = $1', [id]);
	},

	getByUsername: (username) => {
		return db.one('SELECT * FROM users WHERE username = $1', [username]);
	},

	update: (id, username, email, password) => {
		return db.none('UPDATE users SET username = $2, email = $3, password = $4 WHERE id = $1', [id, username, email, password]);
	},

	delete: (id) => {
		return (db.none('DELETE FROM users WHERE id = $1', [id]));
	},
};

module.exports = User;