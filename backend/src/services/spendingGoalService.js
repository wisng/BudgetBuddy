const db = require("../../config/db");
const helperService = require("./helperService");

const createSpendingGoal = async (budgetID, spendingGoal, userID) => {
	const budget = await helperService.checkBudgetExists(budgetID, userID);
	const spendingGoalQuery = `
        INSERT INTO SpendingGoal (categoryID, budgetID, spendingLimit, currAmount, startDate, endDate)
        Values(?, ?, ?, ?, ?, ?)
    `;

	const spendingGoalValues = [
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

const getSpendingGoal = async (budgetID, spendingGoalID, userID) => {
	const budget = await helperService.checkBudgetExists(budgetID, userID);
	const query = `SELECT * FROM SpendingGoal WHERE spendingGoalID = ? AND budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [spendingGoalID, budget.budgetID], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllSpendingGoals = async (budgetID, { day, month, year }, userID) => {
	const budget = await helperService.checkBudgetExists(budgetID, userID);
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
	spendingGoalID,
	budgetID,
	spendingGoalData,
	userID
) => {
	const budget = await helperService.checkBudgetExists(budgetID, userID);
	const spendingGoalQuery = `UPDATE SpendingGoal SET categoryID = ?, spendingLimit = ?, currAmount = ?, startDate = ?, endDate = ? WHERE spendingGoalID = ? AND budgetID = ?`;
	const spendingGoalValues = [
		spendingGoalData.categoryID,
		spendingGoalData.spendingLimit,
		spendingGoalData.currAmount,
		spendingGoalData.startDate,
		spendingGoalData.endDate,
		spendingGoalID,
		budget.budgetID,
	];

	return new Promise((resolve, reject) => {
		db.query(spendingGoalQuery, spendingGoalValues, (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const deleteSpendingGoal = async (spendingGoalID, userID) => {
	const budget = await helperService.checkBudgetExists(budgetID, userID);
	const query = `DELETE FROM SpendingGoal WHERE spendingGoalID = ? AND budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [spendingGoalID, budget.budgetID], (error, results) => {
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
