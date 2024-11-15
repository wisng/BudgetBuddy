const db = require("../../config/db");
const budgetService = require("./budgetService");

const createCategory = async (categoryData, userId) => {
	const budget = await budgetService.getBudget(categoryData.budgetID, userId);
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
		db.query(query, values, (error) => {
			if (error) return reject(error);
			resolve();
		});
	});
};

const getCategory = async (budgetID, categoryId, userId) => {
	const budget = await budgetService.getBudget(budgetID, userId);
	const query = `SELECT * FROM Category WHERE budgetID = ? AND categoryID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [budget.budgetID, categoryId], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllCategories = async (budgetID, userId) => {
	const budget = await budgetService.getBudget(budgetID, userId);
	const query = `SELECT * FROM Category WHERE budgetID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [budget.budgetID], (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const getAllCustomCategories = async (budgetID, userId) => {
	const budget = await budgetService.getBudget(budgetID, userId);
	const query = `SELECT * FROM Category WHERE budgetID = ? AND isCustom = true`;
	return new Promise((resolve, reject) => {
		db.query(query, [budget.budgetID], (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const updateCategory = async (budgetID, categoryId, categoryData, userId) => {
	const budget = await budgetService.getBudget(budgetID, userId);
	const query = `
    UPDATE Category 
    SET name = ?, colour = ?, isCustom = ? 
    WHERE budgetID = ? AND categoryID = ?`;
	const values = [
		categoryData.name,
		categoryData.colour,
		categoryData.isCustom,
		budget.budgetID,
		categoryId,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error) => {
			if (error) return reject(error);
			resolve({ id, ...categoryData });
		});
	});
};

const deleteCategory = async (budgetID, categoryId, userId) => {
	const budget = await budgetService.getBudget(budgetID, userId);
	const query = `DELETE FROM Category WHERE budgetID = ? AND categoryID = ?`;
	return new Promise((resolve, reject) => {
		db.query(
			query,
			[budget.budgetID, categoryId, userId],
			(error, results) => {
				if (error) return reject(error);
				resolve(results.affectedRows > 0);
			}
		);
	});
};

module.exports = {
	createCategory,
	getCategory,
	getAllCategories,
	updateCategory,
	deleteCategory,
};
