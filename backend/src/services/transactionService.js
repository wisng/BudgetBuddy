const db = require("../../config/db");
const budgetService = require("./budgetService");

const createTransaction = async (budgetId, transaction, userId) => {
	const transactionQuery = `
	  INSERT INTO Transaction (budgetID, title, categoryID, amount, date, transactionType, recurrenceFrequency, recurrenceStartDate, recurrenceEndDate)
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`;

	const transactionValues = [
		budgetId,
		transaction.title,
		// userId,
		transaction.categoryID,
		parseFloat(transaction.amount),
		transaction.date.split("T")[0],
		transaction.transactionType,
		transaction.recurrenceFrequency || null,
		transaction.recurrenceStartDate ? transaction.recurrenceStartDate.split("T")[0] : null,
		transaction.recurrenceEndDate ? transaction.recurrenceEndDate.split("T")[0] : null,
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

};

const getTransaction = (transactionId, userId) => {
	const query = `SELECT Transaction.* FROM Transaction INNER JOIN UserTransaction ON Transaction.transactionID = UserTransaction.transactionID WHERE UserTransaction.userID = ? AND Transaction.transactionID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [userId, transactionId], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllTransaction = (budgetID, { day, month, year, current }, userId) => {
	console.log(budgetID);
	console.log(userId);

	let query = `SELECT Transaction.* FROM Transaction INNER JOIN UserTransaction ON Transaction.transactionID = UserTransaction.transactionID WHERE UserTransaction.userID = ? AND Transaction.budgetID = ?`;
	const queryParams = [budgetID, userId];

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

	if (!year && !month && !day && current) {
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

const updateTransaction = (
	transactionId,
	transactionData,
	budgetId,
	userId
) => {
	const query = `
    UPDATE Transaction
    INNER JOIN UserTransaction ON Transaction.transactionID = UserTransaction.transactionID
    SET title = ?, categoryID = ?, amount = ?, date = ?, transactionType = ?, 
        recurrenceFrequency = ?, recurrenceStartDate = ?, recurrenceEndDate = ?
    WHERE Transaction.transactionID = ? AND UserTransaction.userID = ?
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
		transactionId,
		userId,
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
