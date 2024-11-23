const db = require("../../config/db");

const updateBudget = async (budgetID, userID) => {
	const transactions = await getAllTransaction(budgetID, userID, {
		day: null,
		month: null,
		year: null,
		current: null,
	});

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
	if (totalBalance !== 0 && totalExpenses !== 0) {
		const savingsRate = (totalBalance - totalExpenses) / totalBalance;
		const expenseRatio = totalExpenses / totalBalance;
		const balanceStability = totalBalance / totalExpenses;

		financialHealthScore =
			(savingsRate + expenseRatio + balanceStability) / 3;
	}
	const query = `UPDATE Budget SET totalBalance = ?, totalIncome = ?, totalExpenses = ?, financialHealthScore = ? WHERE budgetID = ?`;
	const values = [
		totalBalance,
		totalIncome,
		totalExpenses,
		financialHealthScore,
		budgetID,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error) => {
			if (error) return reject(error);
			resolve({ budgetID, ...values });
		});
	});
};

const checkBudgetExists = (budgetID, userID) => {
	const query = `SELECT Budget.* FROM Budget INNER JOIN UserBudget ON Budget.budgetID = UserBudget.budgetID WHERE UserBudget.userID = ? AND Budget.budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [userID, budgetID], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const createTransaction = async (budgetID, transaction, userID) => {
	const transactionQuery = `
	  INSERT INTO Transaction (budgetID, title, categoryID, amount, date, transactionType, recurrenceFrequency, recurrenceStartDate, recurrenceEndDate)
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`;
	const transactionValues = [
		budgetID,
		transaction.title,
		transaction.categoryID,
		transaction.amount,
		transaction.date,
		transaction.transactionType,
		transaction.recurrenceFrequency || null,
		transaction.recurrenceStartDate || null,
		transaction.recurrenceEndDate || null,
	];

	await new Promise((resolve, reject) => {
		db.query(transactionQuery, transactionValues, (error, results) => {
			if (error) return reject(error);

			const userTransactionQuery = `INSERT INTO UserTransaction (userID, transactionID) VALUES (?, ?)`;
			const userTransactionValues = [userID, results.insertId];

			db.query(userTransactionQuery, userTransactionValues, (error) => {
				if (error) return reject(error);
				resolve({ transactionID: results.insertId, ...transaction });
			});
		});
	});

	return await updateBudget(budgetID, userID);
};

const getAllTransaction = (budgetID, userID, { day, month, year, current }) => {
	let query = `SELECT Transaction.* FROM Transaction INNER JOIN UserTransaction ON Transaction.transactionID = UserTransaction.transactionID WHERE UserTransaction.userID = ? AND Transaction.budgetID = ?`;
	const queryParams = [userID, budgetID];

	if (year) {
		query += ` AND YEAR(date) = ?`;
		queryParams.push(year);
	}

	if (month) {
		query += ` AND MONTH(date) = ?`;
		queryParams.push(month);
	}

	if (day) {
		query += ` AND DAY(date) = ?`;
		queryParams.push(day);
	}

	// if (!year && !month && !day) {
	if (current) {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;
		const currentDay = currentDate.getDate();

		query += ` AND YEAR(date) = ? AND MONTH(date) = ? AND DAY(date) = ?`;
		queryParams.push(currentYear, currentMonth, currentDay);
	}

	return new Promise((resolve, reject) => {
		db.query(query, queryParams, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const createCategory = async (categoryData, userID) => {
	const budget = await checkBudgetExists(categoryData.budgetID, userID);
	const query = `
    INSERT INTO Category (name, colour, isCustom, budgetID) 
    VALUES (?, ?, ?, ?)`;
	const values = [
		categoryData.name,
		categoryData.colour,
		categoryData.isCustom,
		budget.budgetID,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

module.exports = {
	updateBudget,
	createTransaction,
	getAllTransaction,
	createCategory,
	checkBudgetExists,
};
