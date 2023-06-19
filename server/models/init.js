const db = require('../config/db');

const createTablesQuery = `
CREATE SCHEMA IF NOT EXISTS main;

CREATE TABLE IF NOT EXISTS main.users (
	ID 			INT				NOT NULL,
	USERNAME 	VARCHAR(50) 	NOT NULL,
	EMAIL		VARCHAR(50) 	NOT NULL,
	PASSWORD	VARCHAR(50) 	NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS main.images (
	ID 			INT				NOT NULL,
	USER_ID		INT 			NOT NULL,		
	IMAGEURL 	VARCHAR(50) 	NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS main.comments (
	ID			INT				NOT NULL,
	USER_ID		INT				NOT NULL,
	IMAGE_ID	INT				NOT NULL,
	CONTENT		TEXT			NOT NULL,
	PRIMARY KEY (ID)		
)
`;

async function createTables() {
	try {
		await db.none(createTablesQuery);
		console.log("Tables created successfully !");
	} catch(error) {
		console.error("Error creating tables: ", error);
	} finally {
		db.$pool.end();
	}
}

// createTables();

module.exports = createTables;