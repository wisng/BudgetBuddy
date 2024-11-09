const db = require("../../config/db");
const budgetService = require("./budgetService");

const createTransaction = async (budgetId, transaction, userId) => {
	const transactionQuery = `
	  INSERT INTO Transaction (budgetID, title, userID, categoryID, amount, date, transactionType, recurrenceFrequency, recurrenceStartDate, recurrenceEndDate)
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`;
	const transactionValues = [
		budgetId,
		transaction.title,
		userId,
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
			const userTransactionValues = [userId, results.insertId];

			db.query(userTransactionQuery, userTransactionValues, (error) => {
				if (error) return reject(error);
				resolve({ transactionID: results.insertId, ...transaction });
			});
		});
	});

	return budgetService.updateBudget(budgetId);
};

const getTransaction = (id) => {
	const query = `SELECT * FROM Transaction WHERE transactionID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [id], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllTransaction = (budgetID, { day, month, year }) => {
	let query = `SELECT * FROM Transaction WHERE budgetID = ?`;
	const queryParams = [budgetID];

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

	if (!year && !month && !day) {
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

const updateTransaction = (transactionID, transactionData, budgetId) => {
	const query = `
	  UPDATE Transaction
	  SET title = ?, categoryID = ?, amount = ?, date = ?, transactionType = ?, 
		  recurrenceFrequency = ?, recurrenceStartDate = ?, recurrenceEndDate = ?
	  WHERE transactionID = ?
	`;

	const values = [
		transactionData.title,
		transactionData.categoryID,
		transactionData.amount,
		transactionData.date,
		transactionData.transactionType,
		transactionData.recurrenceFrequency || null,
		transactionData.recurrenceStartDate || null,
		transactionData.recurrenceEndDate || null,
		transactionID,
	];

	new Promise((resolve, reject) => {
		db.query(query, values, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});

	return budgetService.updateBudget(budgetId);
};

const deleteTransaction = (transactionId, userId, budgetId) => {
	new Promise((resolve, reject) => {
		const checkOwnershipQuery = `
		SELECT * FROM UserTransaction WHERE transactionID = ? AND userID = ?
		`;

		db.query(
			checkOwnershipQuery,
			[transactionId, userId],
			(error, results) => {
				if (error) return reject(error);
				if (results.length === 0) {
					return resolve({ affectedRows: 0 });
				}

				const deleteUserTransactionQuery = `DELETE FROM UserTransaction WHERE transactionID = ?`;
				db.query(
					deleteUserTransactionQuery,
					[transactionId],
					(error) => {
						if (error) return reject(error);
						const deleteTransactionQuery = `DELETE FROM Transaction WHERE transactionID = ?`;
						db.query(
							deleteTransactionQuery,
							[transactionId],
							(error, results) => {
								if (error) return reject(error);
								resolve(results);
							}
						);
					}
				);
			}
		);
	});

	return budgetService.updateBudget(budgetId);
};

module.exports = {
	createTransaction,
	getTransaction,
	getAllTransaction,
	updateTransaction,
	deleteTransaction,
};
