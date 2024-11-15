const db = require("../../config/db");
const transactionService = require("./transactionService");

const ACCOUNT_TYPE = {
	INDIVIDUAL: "Individual",
	SHARED: "Shared",
};

const createBudget = async (userId) => {
	const budgetQuery = `
	  INSERT INTO Budget (totalBalance, totalIncome, totalExpenses, accountType, financialHealthScore, creationDate)
	  VALUES (?, ?, ?, ?, ?, ?)
	`;
	const budgetValues = [0, 0, 0, ACCOUNT_TYPE.INDIVIDUAL, 0, new Date()]; // For now, default will be Individual.

	const budgetId = await new Promise((resolve, reject) => {
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

	return budgetId;
};

const getBudget = (budgetId, userId) => {
	const query = `SELECT Budget.* FROM Budget INNER JOIN UserBudget ON Budget.budgetID = UserBudget.budgetID WHERE UserBudget.userID = ? AND Budget.budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [userId, budgetId], (error, results) => {
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

const updateBudget = async (budgetID, userId) => {
	console.log(userId)
	const transactions = await transactionService.getAllTransaction(
		budgetID,
		{},
		(userId = userId)
	);

	console.log(transactions);

	let totalBalance = 0;
	let totalIncome = 0;
	let totalExpenses = 0;
	let financialHealthScore = 0;

	for (const transaction of transactions) {
		// totalBalance += transaction.amount;
		if (transaction.transactionType === "Income") {
			totalIncome += transaction.amount;
			totalBalance += transaction.amount;
		} else if (transaction.transactionType === "Expense") {
			totalExpenses += transaction.amount;
			totalBalance -= transaction.amount;
		}
	}
	
	console.log("total balance", totalBalance);
	console.log("total income", totalIncome);
	console.log("total expenses", totalExpenses);

	const savingsRate = totalBalance !== 0 ? (totalBalance - totalExpenses) / totalBalance : 0;
	const expenseRatio = totalBalance !== 0 ? (totalExpenses / totalBalance) : 0;
	const balanceStability = totalExpenses !== 0 ? (totalBalance / totalExpenses) : 0;

	financialHealthScore = (savingsRate + expenseRatio + balanceStability) / 3;

	const query = `UPDATE Budget SET totalBalance = ?, totalIncome = ?, totalExpenses = ?, financialHealthScore = ? WHERE budgetID = ?`;
	const values = [
		totalBalance,
		totalIncome,
		totalExpenses,
		financialHealthScore,
		budgetID,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error, results) => {
			if (error) return reject(error);
			// resolve({ budgetId, ...budgetData });
			// resolve(results);
			resolve(budgetID);
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
