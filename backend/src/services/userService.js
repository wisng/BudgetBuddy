const db = require("../../config/db");
const bcrypt = require("bcryptjs");

const USER_TYPE = {
	USER: "User",
	FINANCIAL_ADVISOR: "FinancialAdvisor",
};

const createUser = async (email, password, userType = USER_TYPE.USER) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const query = `INSERT INTO User (email, password, userType) VALUES (?, ?, ?)`;

	return new Promise((resolve, reject) => {
		db.query(query, [email, hashedPassword, userType], (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
};

const findUserByEmail = (email) => {
	const query = `SELECT * FROM User WHERE email = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [email], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0] || null);
			}
		});
	});
};

module.exports = { createUser, findUserByEmail };
