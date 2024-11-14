const db = require("../../config/db");

const createSpendingGoal = async (budgetId, spendingGoal, userId) => {
	const budget = await budgetService.getBudget(budgetId, userId);
	const spendingGoalQuery = `
        INSERT INTO SpendingGoal (spendingGoalID, categoryID, budgetID, spendingLimit, currAmount, startDate, endDate)
        Values(?, ?, ?, ?, ?, ?)
    `;

	const spendingGoalValues = [
		spendingGoal.spendingGoalID,
		spendingGoal.categoryID,
		budget.budgetID,
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

const getSpendingGoal = async (budgetId, spendingGoalId, userId) => {
	const budget = await budgetService.getBudget(budgetId, userId);
	const query = `SELECT * FROM SpendingGoal WHERE spendingGoalID = ? AND budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [spendingGoalId, budget.budgetID], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllSpendingGoals = async (budgetId, { day, month, year }, userId) => {
	const budget = await budgetService.getBudget(budgetId, userId);
	let query = `SELECT * FROM SpendingGoal WHERE budgetID = ? AND endDate >= ?`;
	const queryParams = [budget.budgetID];

	const currentDate = new Date();
	const queryYear = year || currentDate.getFullYear();
	const queryMonth = month || (year ? 1 : currentDate.getMonth() + 1);
	const queryDay = day || (month ? 1 : currentDate.getDate());

	// Format the date string for the query (e.g., 'YYYY-MM-DD')
	const dateString = `${queryYear}-${String(queryMonth).padStart(
		2,
		"0"
	)}-${String(queryDay).padStart(2, "0")}`;
	queryParams.push(dateString);

	return new Promise((resolve, reject) => {
		db.query(query, queryParams, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const updateSpendingGoal = async (
	spendingGoalId,
	budgetId,
	spendingGoalData,
	userId
) => {
	const budget = await budgetService.getBudget(budgetId, userId);
	const spendingGoalQuery = `UPDATE SpendingGoal SET categoryID = ?, spendingLimit = ?, currAmount = ?, startDate = ?, endDate = ? WHERE spendingGoalID = ? AND budgetID = ?`;
	const spendingGoalValues = [
		spendingGoalData.categoryID,
		spendingGoalData.spendingLimit,
		spendingGoalData.currAmount,
		spendingGoalData.startDate,
		spendingGoalData.endDate,
		spendingGoalId,
		budget.budgetID,
	];

	return new Promise((resolve, reject) => {
		db.query(spendingGoalQuery, spendingGoalValues, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const deleteSpendingGoal = async (spendingGoalId, userId) => {
	const budget = await budgetService.getBudget(budgetId, userId);
	const query = `DELETE FROM SpendingGoal WHERE spendingGoalID = ? AND budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [spendingGoalId, budget.budgetID], (error, results) => {
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
