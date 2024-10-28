const db = require("../../config/db");
const bcrypt = require("bcryptjs");

const createUser = async (email, password, accountType = "User") => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const query = `INSERT INTO User (email, password, accountType) VALUES (?, ?, ?)`;

	return new Promise((resolve, reject) => {
		db.query(query, [email, hashedPassword, accountType], (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
};

module.exports = { createUser };
