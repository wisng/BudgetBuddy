const db = require("../../config/db");
const bcrypt = require("bcryptjs");

const USER_TYPE = {
	USER: "User",
	FINANCIAL_ADVISOR: "FinancialAdvisor",
};

// const createUser = async (email, name, username, password, userType = USER_TYPE.USER) => {
const createUser = async (email, name, username, password, role) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const query = `INSERT INTO User (email, name, username, password, userType) VALUES (?, ?, ?, ?, ?)`;

	return new Promise((resolve, reject) => {
		db.query(query, [email, name, username, hashedPassword, role], (err, result) => {
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
