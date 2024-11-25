const db = require("../../config/db");
const helperService = require("./helperService");

const createTransaction = async (budgetID, transaction, userID) => {
	const transactionQuery = `
	  INSERT INTO Transaction (budgetID, title, categoryID, amount, date, transactionType, recurrenceFrequency, recurrenceStartDate, recurrenceEndDate)
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`;

	const transactionValues = [
		budgetID,
		transaction.title,
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
			const userTransactionValues = [userID, results.insertId];

			db.query(userTransactionQuery, userTransactionValues, (error) => {
				if (error) return reject(error);
				resolve({ transactionID: results.insertId, ...transaction });
			});
		});
	});

	return await helperService.updateBudget(budgetID, userID);
};

const getTransaction = (transactionID, userID) => {
	const query = `SELECT Transaction.* FROM Transaction INNER JOIN UserTransaction ON Transaction.transactionID = UserTransaction.transactionID WHERE UserTransaction.userID = ? AND Transaction.transactionID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [userID, transactionID], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllTransaction = (budgetID, userID, { day, month, year }) => {
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

const updateTransaction = async (
	transactionID,
	transactionData,
	budgetID,
	userID
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
		transactionID,
		userID,
	];

	new Promise((resolve, reject) => {
		db.query(query, values, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});

	return await helperService.updateBudget(budgetID, userID);
};

const deleteTransaction = async (transactionID, userID, budgetID) => {
	new Promise((resolve, reject) => {
		const checkOwnershipQuery = `
		SELECT * FROM UserTransaction WHERE transactionID = ? AND userID = ?
		`;

		db.query(
			checkOwnershipQuery,
			[transactionID, userID],
			(error, results) => {
				if (error) return reject(error);
				if (results.length === 0) {
					return resolve({ affectedRows: 0 });
				}

				const deleteUserTransactionQuery = `DELETE FROM UserTransaction WHERE transactionID = ?`;
				db.query(
					deleteUserTransactionQuery,
					[transactionID],
					(error) => {
						if (error) return reject(error);
						const deleteTransactionQuery = `DELETE FROM Transaction WHERE transactionID = ?`;
						db.query(
							deleteTransactionQuery,
							[transactionID],
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

	return await helperService.updateBudget(budgetID, userID);
};

module.exports = {
	createTransaction,
	getTransaction,
	getAllTransaction,
	updateTransaction,
	deleteTransaction,
};
