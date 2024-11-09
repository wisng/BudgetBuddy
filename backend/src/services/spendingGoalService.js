const db = require("../../config/db");

const createSpendingGoal = (budgetId, spendingGoal) => {
	const spendingGoalQuery = `
        INSERT INTO SpendingGoal (spendingGoalID, categoryID, budgetID, spendingLimit, currAmount, startDate, endDate)
        Values(?, ?, ?, ?, ?, ?)
    `;
	const spendingGoalValues = [
		spendingGoal.spendingGoalID,
		spendingGoal.categoryID,
		budgetId,
		spendingGoal.spendingLimit,
		spendingGoal.currAmount,
		spendingGoal.startDate,
		spendingGoal.endDate,
	];

	return new Promise((resolve, reject) => {
		db.query(spendingGoalQuery, spendingGoalValues, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const getSpendingGoal = (id) => {
	const query = `SELECT * FROM SpendingGoal WHERE spendingGoalID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [id], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllSpendingGoals = (budgetId, { day, month, year }) => {
	let query = `SELECT * FROM SpendingGoal WHERE budgetID = ?`;

	const queryParams = [budgetId];

	if (year) {
		query += ` AND YEAR(startDate) = ?`;
		queryParams.push(year);
	}

	if (month) {
		query += ` AND MONTH(startDate) = ?`;
		queryParams.push(month);
	}

	if (day) {
		query += ` AND DAY(startDate) = ?`;
		queryParams.push(day);
	}

	if (!year && !month && !day) {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;
		const currentDay = currentDate.getDate();

		query += ` AND YEAR(startDate) = ? AND MONTH(startDate) = ? AND DAY(startDate) = ?`;
		queryParams.push(currentYear, currentMonth, currentDay);
	}

	return new Promise((resolve, reject) => {
		db.query(query, queryParams, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const updateSpendingGoal = (id, spendingGoalData) => {
	const spendingGoalQuery = `UPDATE SpendingGoal SET categoryID = ?, spendingLimit = ?, currAmount = ?, startDate = ?, endDate = ? WHERE spendingGoalID = ?`;
	const spendingGoalValues = [
		spendingGoalData.categoryID,
		spendingGoalData.spendingLimit,
		spendingGoalData.currAmount,
		spendingGoalData.startDate,
		spendingGoalData.endDate,
		id,
	];

	return new Promise((resolve, reject) => {
		db.query(spendingGoalQuery, spendingGoalValues, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const deleteSpendingGoal = (id) => {
	const query = `DELETE FROM SpendingGoal WHERE spendingGoalID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [id], (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

module.exports = {
	createSpendingGoal,
	getSpendingGoal,
	getAllSpendingGoals,
	updateSpendingGoal,
	deleteSpendingGoal,
};
