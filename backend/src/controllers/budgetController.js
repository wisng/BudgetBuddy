const budgetService = require("../services/budgetService");

const createBudget = async (req, res) => {
	try {
		await budgetService.createBudget(req.userId);
		res.status(201).json({ message: "Budget created successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getBudget = async (req, res) => {
	const { budgetId } = req.params;
	try {
		const budget = await budgetService.getBudget(budgetId, req.userId);
		if (!budget)
			return res.status(404).json({ message: "Budget not found" });
		res.json(budget);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAllBudgets = async (req, res) => {
	try {
		const budgets = await budgetService.getAllBudgets(req.userId);
		res.json(budgets);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteBudget = async (req, res) => {
	const { budgetId } = req.params;
	try {
		await budgetService.deleteBudget(budgetId, req.userId);
		res.status(204).send({ message: "Budget deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createBudget,
	getBudget,
	getAllBudgets,
	deleteBudget,
};
