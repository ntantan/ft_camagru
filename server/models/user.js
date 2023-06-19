const db = require('../config/db');

const User = {
	create: (username, email, password) => {
		return db.none('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
	}
}
