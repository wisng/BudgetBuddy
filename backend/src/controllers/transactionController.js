const transactionService = require("../services/transactionService");
const budgetService = require("../services/budgetService");

const createTransaction = async (req, res) => {
	console.log(req.params);
	const { budgetID } = req.params;
	try {
		const transaction = await transactionService.createTransaction(
			budgetID,
			req.body,
			req.userId
		);
		await budgetService.updateBudget(budgetID, req.userId);
		res.status(201).json(transaction);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getTransaction = async (req, res) => {
	const { budgetId, transactionId } = req.params;
	try {
		const transaction = await transactionService.getTransaction(
			budgetId,
			transactionId,
			req.userId
		);
		if (!transaction)
			return res.status(404).json({ message: "Transaction not found" });
		res.json(transaction);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAllTransaction = async (req, res) => {
	const { budgetId } = req.params;
	const { day, month, year } = req.query;
	try {
		const transactions = await transactionService.getAllTransaction(
			budgetId,
			{ day, month, year },
			req.userId
		);
		res.json(transactions);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateTransaction = async (req, res) => {
	const { budgetId, transactionId } = req.params;
	try {
		const updatedTransaction = await transactionService.updateTransaction(
			transactionId,
			req.body,
			budgetId,
			req.userId
		);
		res.json(updatedTransaction);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteTransaction = async (req, res) => {
	const { budgetId, transactionId } = req.params;
	try {
		await transactionService.deleteTransaction(
			transactionId,
			req.userId,
			budgetId
		);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createTransaction,
	getTransaction,
	getAllTransaction,
	updateTransaction,
	deleteTransaction,
};
