const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const budgetService = require("./budgetService");
const categoryService = require("./categoryService");

const USER_TYPE = {
	CLIENT: "Client",
	FINANCIAL_ADVISOR: "FinancialAdvisor",
};

const createUser = async (
	email,
	username,
	password,
	userType
) => {
	await new Promise((resolve, reject) => {
		db.query(
			`SELECT * FROM User WHERE email = ? OR username = ?`,
			[email, username],
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
	const query = `INSERT INTO User (email, username, password, userType) VALUES (?, ?, ?, ?, ?)`;
	const user = await new Promise((resolve, reject) => {
		db.query(
			query,
			[email, username, hashedPassword, userType],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
	const budgetID = await budgetService.createBudget(user.insertId);
	const categoryData = [
		{
			name: "Entertainment",
			colour: "#00FF00",
			isCustom: true,
			budgetID: budgetID,
		},
		{
			name: "Shopping",
			colour: "#FF0000",
			isCustom: true,
			budgetID: budgetID,
		},
		{
			name: "Dining Out",
			colour: "#0000FF",
			isCustom: true,
			budgetID: budgetID,
		},
		{
			name: "Transportation",
			colour: "#00FFFF",
			isCustom: true,
			budgetID: budgetID,
		},
	];
	for (const category of categoryData) {
		categoryService.createCategory(category, user.insertId);
	}
	return user.insertId;
};

const findUser = (identifier) => {
	const query = `SELECT * FROM User WHERE email = ? OR username = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [identifier, identifier], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0] || null);
			}
		});
	});
};

const findUserByID = (userID) => {
	console.log(userID);
	const query = `SELECT * FROM User WHERE userID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [userID], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0] || null);
			}
		});
	});
};

module.exports = { createUser, findUser, findUserByID };
