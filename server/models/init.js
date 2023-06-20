const db = require('../config/db');

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS users (
	ID 			SERIAL			NOT NULL,
	USERNAME 	VARCHAR(50) 	NOT NULL UNIQUE,
	EMAIL		VARCHAR(50) 	NOT NULL UNIQUE,
	PASSWORD	VARCHAR(200) 	NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS images (
	ID 			SERIAL			NOT NULL,
	USER_ID		INT 			NOT NULL,		
	IMAGEURL 	VARCHAR(50) 	NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS comments (
	ID			SERIAL			NOT NULL,
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
	}
}

// createTables();

module.exports = createTables;