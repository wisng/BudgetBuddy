const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const budgetService = require("./budgetService");

const USER_TYPE = {
	Client: "Client",
	FINANCIAL_ADVISOR: "FinancialAdvisor",
};

const createUser = async (email, password, userType = USER_TYPE.USER) => {
	await new Promise((resolve, reject) => {
		db.query(
			`SELECT * FROM User WHERE email = ?`,
			[email],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					if (results.length > 0) {
						reject(new Error("User already exists"));
					} else {
						resolve();
					}
				}
			}
		);
	});

	const hashedPassword = await bcrypt.hash(password, 10);
	const query = `INSERT INTO User (email, password, userType) VALUES (?, ?, ?)`;
	const user = await new Promise((resolve, reject) => {
		db.query(query, [email, hashedPassword, userType], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
	return await budgetService.createBudget(user.insertId);
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
