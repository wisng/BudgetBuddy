const db = require("../../config/db");
const transactionService = require("./transactionService");

const ACCOUNT_TYPE = {
	INDIVIDUAL: "INDIVIDUAL",
	SHARED: "SHARED",
};

const createBudget = (userId) => {
	const budgetQuery = `
	  INSERT INTO Budget (totalBalance, totalIncome, totalExpenses, accountType, financialHealthScore, creationDate)
	  VALUES (?, ?, ?, ?, ?, ?)
	`;
	const budgetValues = [0, 0, 0, ACCOUNT_TYPE.INDIVIDUAL, 0, new Date()]; // For now, default will be Individual.

	return new Promise((resolve, reject) => {
		db.query(budgetQuery, budgetValues, (error, budgetResults) => {
			if (error) return reject(error);

			const userBudgetQuery = `
		  INSERT INTO UserBudget (userID, budgetID) VALUES (?, ?)
		`;
			const userBudgetValues = [
				// budgetData.userID,
				userId,
				budgetResults.insertId,
			];

			db.query(userBudgetQuery, userBudgetValues, (error) => {
				if (error) return reject(error);
				resolve({ id: budgetResults.insertId, ...budgetValues });
			});
		});
	});
};

const getBudget = (id) => {
	const query = `SELECT * FROM Budget WHERE budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [id], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllBudgets = (userId) => {
	const query = `
    SELECT Budget.* 
    FROM Budget 
    INNER JOIN UserBudget ON Budget.budgetID = UserBudget.budgetID 
    WHERE UserBudget.userID = ?
  `;
	return new Promise((resolve, reject) => {
		db.query(query, [userId], (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const updateBudget = (budgetId) => {
	const transactions = transactionService.getAllTransaction(budgetId);

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

	const query = `UPDATE Budget SET totalBalance = ?, totalIncome = ?, totalExpenses = ?, financialHealthScore = ? WHERE budgetID = ?`;
	const values = [
		totalBalance,
		totalIncome,
		totalExpenses,
		financialHealthScore, // Need to update how to calcualte this.
		id,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error) => {
			if (error) return reject(error);
			resolve({ id, ...budgetData });
		});
	});
};

const deleteBudget = (budgetId, userId) => {
	return new Promise((resolve, reject) => {
		const checkOwnershipQuery = `
		  SELECT * FROM UserBudget WHERE budgetID = ? AND userID = ?
		`;

		db.query(checkOwnershipQuery, [budgetId, userId], (error, results) => {
			if (error) return reject(error);
			if (results.length === 0) {
				return resolve({ affectedRows: 0 });
			}

			const deleteUserBudgetQuery = `DELETE FROM UserBudget WHERE budgetID = ?`;
			db.query(deleteUserBudgetQuery, [budgetId], (error) => {
				if (error) return reject(error);

				const deleteBudgetQuery = `DELETE FROM Budget WHERE budgetID = ?`;
				db.query(deleteBudgetQuery, [budgetId], (error, results) => {
					if (error) return reject(error);
					resolve(results);
				});
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
};
