const db = require("../../config/db");

const createCategory = (categoryData) => {
	const query = `
    INSERT INTO Category (name, colour, isCustom, budgetID) 
    VALUES (?, ?, ?, ?)`;
	const values = [
		categoryData.name,
		categoryData.colour,
		categoryData.isCustom,
		categoryData.budgetID,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error) => {
			if (error) return reject(error);
			resolve();
		});
	});
};

const getCategory = (budgetID, id) => {
	const query = `SELECT * FROM Category WHERE budgetID = ? AND categoryID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [budgetID, id], (error, results) => {
			if (error) return reject(error);
			resolve(results[0]);
		});
	});
};

const getAllCategories = (budgetID) => {
	const query = `SELECT * FROM Category WHERE budgetID = ? AND isCustom = true`;
	return new Promise((resolve, reject) => {
		db.query(query, [budgetID], (error, results) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
};

const updateCategory = (budgetID, id, categoryData) => {
	const query = `
    UPDATE Category 
    SET name = ?, colour = ?, isCustom = ? 
    WHERE budgetID = ? AND categoryID = ?`;
	const values = [
		categoryData.name,
		categoryData.colour,
		categoryData.isCustom,
		budgetID,
		id,
	];

	return new Promise((resolve, reject) => {
		db.query(query, values, (error) => {
			if (error) return reject(error);
			resolve({ id, ...categoryData });
		});
	});
};

const deleteCategory = (budgetID, id) => {
	const query = `DELETE FROM Category WHERE budgetID = ? AND categoryID = ?`;
	return new Promise((resolve, reject) => {
		db.query(query, [budgetID, id], (error, results) => {
			if (error) return reject(error);
			resolve(results.affectedRows > 0);
		});
	});
};

module.exports = {
	createCategory,
	getCategory,
	getAllCategories,
	updateCategory,
	deleteCategory,
};
