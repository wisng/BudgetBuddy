const db = require("../../config/db");
const helperService = require("./helperService");

const ACCOUNT_TYPE = {
	INDIVIDUAL: "Individual",
	SHARED: "Shared",
};

const createBudget = async (userID, budgetData = null) => {
	// budgetData expects { accountType, title, initalBalance }
	const budgetQuery = `
	  INSERT INTO Budget (totalBalance, totalIncome, totalExpenses, accountType, financialHealthScore, creationDate, ownerID, title)
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
	`;
	let budgetValues = [
		0,
		0,
		0,
		ACCOUNT_TYPE.INDIVIDUAL,
		0,
		new Date(),
		userID,
		"Default",
	];

	if (budgetData) {
		budgetValues = [
			budgetData.initialBalance,
			0,
			0,
			budgetData.accountType,
			0,
			new Date(),
			userID,
			budgetData.title,
		];
	}

	const budgetID = await new Promise((resolve, reject) => {
		db.query(budgetQuery, budgetValues, (error, budgetResults) => {
			if (error) return reject(error);

			const userBudgetQuery = `
		  INSERT INTO UserBudget (userID, budgetID) VALUES (?, ?)
		`;
			const userBudgetValues = [
				userId,
				budgetResults.insertId,
			];

			db.query(userBudgetQuery, userBudgetValues, (error) => {
				if (error) return reject(error);
				resolve(budgetResults.insertId);
			});
		});
	});
	if (budgetData && budgetData.initialBalance > 0) {
		const category = await helperService.createCategory(
			{
				name: "Initial Balance",
				colour: "#808080",
				isCustom: false,
				budgetID: budgetID,
			},
			userID
		);
		await helperService.createTransaction(
			budgetID,
			{
				title: "Initial Balance",
				categoryID: category.insertId,
				amount: budgetData.initialBalance,
				date: new Date(),
				transactionType: "Income",
				recurrenceFrequency: null,
				recurrenceStartDate: null,
				recurrenceEndDate: null,
			},
			userID
		);
	}
	return budgetID;
};

const getBudget = (budgetID, userID) => {
	const query = `SELECT Budget.* FROM Budget INNER JOIN UserBudget ON Budget.budgetID = UserBudget.budgetID WHERE UserBudget.userID = ? AND Budget.budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [userID, budgetID], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllBudgets = (userID) => {
	const query = `
    SELECT Budget.* 
    FROM Budget 
    INNER JOIN UserBudget ON Budget.budgetID = UserBudget.budgetID 
    WHERE UserBudget.userID = ?
  `;
	return new Promise((resolve, reject) => {
		db.query(query, [userID], (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const deleteBudget = (budgetID, userID) => {
	return new Promise((resolve, reject) => {
		const checkBudgetCount = `SELECT COUNT(*) FROM UserBudget WHERE userID = ?`;

		if (checkBudgetCount === 1) {
			return reject({ message: "User must have at least one budget" });
		}

		const checkOwnershipQuery = `
		  SELECT * FROM UserBudget WHERE budgetID = ? AND userID = ?
		`;

		db.query(checkOwnershipQuery, [budgetID, userID], (error, results) => {
			if (error) return reject(error);
			if (results.length === 0) {
				return resolve({ affectedRows: 0 });
			}

			const deleteUserBudgetQuery = `DELETE FROM UserBudget WHERE budgetID = ?`;
			db.query(deleteUserBudgetQuery, [budgetID], (error) => {
				if (error) return reject(error);

				const deleteBudgetQuery = `DELETE FROM Budget WHERE budgetID = ?`;
				db.query(deleteBudgetQuery, [budgetID], (error, results) => {
					if (error) return reject(error);
					resolve(results);
				});
			});
		});
	});
};

const addUser = (budgetID, ownerID, identifier) => {
	return new Promise((resolve, reject) => {
		getBudget(budgetID, ownerID).then((budget) => {
			if (!budget) {
				return reject({ message: "Budget not found" });
			}
			if (budget.ownerID !== ownerID) {
				return reject({
					message: "You are not the owner of this budget",
				});
			}

			// check if user exists

			const userQuery = `SELECT * FROM User WHERE email = ? OR username = ?`;
			db.query(userQuery, [identifier, identifier], (error, results) => {
				if (error) return reject(error);
				if (results.length === 0) {
					return reject({ message: "User not found" });
				} else {
					// add user to budget
					const userID = results[0].userID;
					const insertQuery = `INSERT INTO UserBudget (budgetID, userID) VALUES (?, ?)`;
					db.query(
						insertQuery,
						[budgetID, userID],
						(error, results) => {
							if (error) return reject(error);
							resolve(results);
						}
					);
				}
				// change budget to shared
				const updateQuery = `UPDATE Budget SET accountType = ? WHERE budgetID = ?`;
				db.query(
					updateQuery,
					[ACCOUNT_TYPE.SHARED, budgetID],
					(error) => {
						if (error) return reject(error);
					}
				);
			});
		});
	});
};

const updateTitle = (budgetID, userID, title) => {
	const query = `UPDATE Budget SET title = ? WHERE budgetID = ? AND ownerID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [title, budgetID, userID], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const removeUser = (budgetID, ownerID, userID) => {
	if (ownerID === userID) {
		return reject({ message: "You cannot remove yourself from a budget" });
	}
	return new Promise((resolve, reject) => {
		getBudget(budgetID, ownerID).then((budget) => {
			if (!budget) {
				return reject({ message: "Budget not found" });
			}
			if (budget.ownerID !== ownerID) {
				return reject({
					message: "You are not the owner of this budget",
				});
			}
		});

		const query = `DELETE FROM UserBudget WHERE budgetID = ? AND userID = ? AND userID != ?`;
		db.query(query, [budgetID, userID, ownerID], (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const getAllBudgetUsers = (budgetID, userID) => {
	return new Promise((resolve, reject) => {
		getBudget(budgetID, userID).then((budget) => {
			if (!budget) {
				return reject({ message: "Budget not found" });
			}

			//Select all users, userID and email in the user budget
			const query = `SELECT User.userID, User.email, User.username FROM User INNER JOIN UserBudget ON User.userID = UserBudget.userID WHERE UserBudget.budgetID = ?`;
			db.query(query, [budgetID], (error, results) => {
				if (error) return reject(error);
				resolve(results);
			});
		});
	});
};

module.exports = {
	createBudget,
	getBudget,
	getAllBudgets,
	deleteBudget,
	addUser,
	removeUser,
	updateTitle,
	getAllBudgetUsers,
};
