const db = require("../../config/db");

const createFinancialReport = (budgetId, userId, data) => {
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
			[budgetId, data.reportPeriodStartDate, data.reportPeriodEndDate],
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
							new Date(recurrenceStartDate) > new Date(endDate) ||
							new Date(recurrenceEndDate) < new Date(startDate)
						) {
							return;
						}

						const daysInPeriod =
							(new Date(endDate) - new Date(startDate)) /
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
							userId,
							budgetId,
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

const getFinancialReport = (reportId, userId) => {
	const financialReportQuery = `
		SELECT * FROM FinancialReport WHERE reportID = ? AND userID = ?
	`;

	return new Promise((resolve, reject) => {
		db.query(financialReportQuery, [reportId], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0]);
			}
		});
	});
};

const getAllFinancialReports = (budgetId, userId) => {
	const financialReportQuery = `
		SELECT * FROM FinancialReport WHERE userID = ? AND budgetID = ?
	`;

	return new Promise((resolve, reject) => {
		db.query(financialReportQuery, [userId, budgetId], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

const deleteFinancialReport = (reportId, userId) => {
	const financialReportQuery = `
		DELETE FROM FinancialReport WHERE reportID = ? AND userID = ?
	`;

	return new Promise((resolve, reject) => {
		db.query(financialReportQuery, [reportId, userId], (err, results) => {
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
