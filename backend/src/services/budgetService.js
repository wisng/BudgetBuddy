const db = require("../../config/db");
const transactionService = require("./transactionService");

const ACCOUNT_TYPE = {
	INDIVIDUAL: "Individual",
	SHARED: "Shared",
};

const createBudget = async (userID) => {
	const budgetQuery = `
	  INSERT INTO Budget (totalBalance, totalIncome, totalExpenses, accountType, financialHealthScore, creationDate, ownerID, title)
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
	`;
	const budgetValues = [
		0,
		0,
		0,
		ACCOUNT_TYPE.INDIVIDUAL,
		0,
		new Date(),
		userID,
		"Default",
	];

	const budgetID = await new Promise((resolve, reject) => {
		db.query(budgetQuery, budgetValues, (error, budgetResults) => {
			if (error) return reject(error);

			const userBudgetQuery = `
		  INSERT INTO UserBudget (userID, budgetID) VALUES (?, ?)
		`;
			const userBudgetValues = [userID, budgetResults.insertId];

			db.query(userBudgetQuery, userBudgetValues, (error) => {
				if (error) return reject(error);
				resolve(budgetResults.insertId);
			});
		});
	});
	I;
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

const updateBudget = (budgetID, userID) => {
	const transactions = transactionService.getAllTransaction(
		budgetID,
		(userID = userID)
	);

	let totalBalance = 0;
	let totalIncome = 0;
	let totalExpenses = 0;
	let financialHealthScore = 0;

	for (const transaction of transactions) {
		totalBalance += transaction.amount;
		if (transaction.transactionType === "Income") {
			totalIncome += transaction.amount;
		} else if (transaction.transactionType === "Expense") {
			totalExpenses += transaction.amount;
		}
	}

	const savingsRate = (totalBalance - totalExpenses) / totalBalance;
	const expenseRatio = totalExpenses / totalBalance;
	const balanceStability = totalBalance / totalExpenses;

	financialHealthScore = (savingsRate + expenseRatio + balanceStability) / 3;

	const query = `UPDATE Budget SET totalBalance = ?, totalIncome = ?, totalExpenses = ?, financialHealthScore = ? WHERE budgetID = ?`;
	const values = [
		totalBalance,
		totalIncome,
		totalExpenses,
		financialHealthScore,
		id,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error) => {
			if (error) return reject(error);
			resolve({ id, ...budgetData });
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

			const query = `SELECT * FROM UserBudget WHERE budgetID = ?`;
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
	updateBudget,
	deleteBudget,
	addUser,
	removeUser,
	updateTitle,
	getAllBudgetUsers,
};
