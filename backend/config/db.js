const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

db.connect((err) => {
	if (err) throw err;
	console.log("Connected to MySQL");

	db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
		if (err) throw err;
		console.log(
			`Database ${process.env.DB_NAME} created or exists already`
		);

		db.changeUser({ database: process.env.DB_NAME }, (err) => {
			if (err) throw err;

			const userTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
          userId INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          accountType ENUM('Admin', 'User', 'FinancialAdvisor') NOT NULL
        )`;
			db.query(userTableQuery, (err) => {
				if (err) throw err;
				console.log("User table created or exists already");
			});
		});
	});
});

module.exports = db;
