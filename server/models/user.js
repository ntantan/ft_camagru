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

	getByEmail: (email) => {
		return db.one('SELECT * FROM users WHERE email = $1', [email]);
	},

	update: (id, username, email, password, verified) => {
		return db.none('UPDATE users SET username = $2, email = $3, password = $4, verified = $5 WHERE id = $1', [id, username, email, password, verified]);
	},

	delete: (id) => {
		return (db.none('DELETE FROM users WHERE id = $1', [id]));
	},
};

module.exports = User;