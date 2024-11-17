const db = require("../../config/db");

const createFinancialReport = (budgetID, userID, data) => {
	const financialReportQuery = `
        INSERT INTO FinancialReport ( userID, budgetID, generatedDate, reportPeriodStartDate, reportPeriodEndDate, totalIncome, totalExpenses, spendingPerCategory, savings )
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )
    `;

	let totalIncome = 0;
	let totalExpenses = 0;
	let spendingPerCategory = {};
	let savings = 0;

	const transactionQuery = `SELECT * FROM Transaction WHERE budgetID = ? AND date BETWEEN ? AND ?`;

	return new Promise((resolve, reject) => {
		db.query(
			transactionQuery,
			[budgetID, data.reportPeriodStartDate, data.reportPeriodEndDate],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					const transactions = results;
					transactions.forEach((transaction) => {
						let {
							amount,
							transactionType,
							categoryID,
							recurrenceFrequency,
							recurrenceStartDate,
							recurrenceEndDate,
						} = transaction;

						if (
							( recurrenceStartDate && new Date(recurrenceStartDate) > new Date(data.reportPeriodEndDate)) ||
							(recurrenceEndDate && new Date(recurrenceEndDate) < new Date(data.reportPeriodStartDate))
						) {
							return;
						}

						const daysInPeriod =
							(new Date(data.reportPeriodEndDate) - new Date(data.reportPeriodStartDate)) /
							(1000 * 60 * 60 * 24);
						let occurrences = 1;

						switch (recurrenceFrequency) {
							case "DAILY":
								occurrences = daysInPeriod;
								break;
							case "WEEKLY":
								occurrences = Math.floor(daysInPeriod / 7);
								break;
							case "BI-WEEKLY":
								occurrences = Math.floor(daysInPeriod / 14);
								break;
							case "MONTHLY":
								occurrences = Math.floor(daysInPeriod / 30);
								break;
							case "YEARLY":
								occurrences = Math.floor(daysInPeriod / 365);
								break;
						}

						const totalAmount = amount * occurrences;

						if (transactionType === "Income") {
							totalIncome += totalAmount;
						} else if (transactionType === "Expense") {
							totalExpenses += totalAmount;
							spendingPerCategory[categoryID] =
								(spendingPerCategory[categoryID] || 0) +
								totalAmount;
						}
					});

					savings = totalIncome - totalExpenses;

					db.query(
						financialReportQuery,
						[
							userID,
							budgetID,
							data.generatedDate,
							data.reportPeriodStartDate,
							data.reportPeriodEndDate,
							totalIncome,
							totalExpenses,
							JSON.stringify(spendingPerCategory),
							savings,
						],
						(err, results) => {
							if (err) {
								reject(err);
							} else {
								resolve(results);
							}
						}
					);
				}
			}
		);
	});
};

const getFinancialReport = (reportID, userID) => {
	const financialReportQuery = `
		SELECT * FROM FinancialReport WHERE reportID = ? AND userID = ?
	`;

	return new Promise((resolve, reject) => {
		db.query(financialReportQuery, [reportID, userID], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0]);
			}
		});
	});
};

const getAllFinancialReports = (budgetID, userID) => {
	const financialReportQuery = `
		SELECT * FROM FinancialReport WHERE userID = ? AND budgetID = ?
	`;

	return new Promise((resolve, reject) => {
		db.query(financialReportQuery, [userID, budgetID], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

const deleteFinancialReport = (reportID, userID) => {
	const financialReportQuery = `
		DELETE FROM FinancialReport WHERE reportID = ? AND userID = ?
	`;

	return new Promise((resolve, reject) => {
		db.query(financialReportQuery, [reportID, userID], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

module.exports = {
	createFinancialReport,
	getFinancialReport,
	getAllFinancialReports,
	deleteFinancialReport,
};
