const spendingGoalService = require("../services/spendingGoalService");

const createSpendingGoal = async (req, res) => {
	const { budgetId } = req.params;
	try {
		const spendingGoal = await spendingGoalService.createSpendingGoal(
			budgetId,
			req.body
		);
		res.status(201).json(spendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getSpendingGoal = async (req, res) => {
	const { budgetId, spendingGoalId } = req.params;
	try {
		const spendingGoal = await spendingGoalService.getSpendingGoal(
			budgetId,
			spendingGoalId
		);
		if (!spendingGoal)
			return res.status(404).json({ message: "spendingGoal not found" });
		res.json(spendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAllSpendingGoal = async (req, res) => {
	const { budgetId } = req.params;
	const { day, month, year } = req.query;
	try {
		const spendingGoals = await spendingGoalService.getAllSpendingGoals(
			budgetId,
			{ day, month, year }
		);
		res.json(spendingGoals);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateSpendingGoal = async (req, res) => {
	const { budgetId, spendingGoalId } = req.params;
	try {
		const updatedspendingGoal =
			await spendingGoalService.updateSpendingGoal(
				spendingGoalId,
				budgetId,
				req.body
			);
		res.json(updatedspendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteSpendingGoal = async (req, res) => {
	const { spendingGoalId } = req.params;
	try {
		await spendingGoalService.deleteSpendingGoal(spendingGoalId);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createSpendingGoal,
	getSpendingGoal,
	getAllSpendingGoal,
	updateSpendingGoal,
	deleteSpendingGoal,
};
