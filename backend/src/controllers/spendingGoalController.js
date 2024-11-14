const spendingGoalService = require("../services/spendingGoalService");

const createSpendingGoal = async (req, res) => {
	const { budgetId } = req.params;
	try {
		const spendingGoal = await spendingGoalService.createSpendingGoal(
			budgetId,
			req.body,
			req.userId
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
			spendingGoalId,
			req.userId
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
			{ day, month, year },
			req.userId
		);
		res.json(spendingGoals);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateSpendingGoal = async (req, res) => {
	const { budgetId, spendingGoalId } = req.params;
	try {
		const updatedSpendingGoal =
			await spendingGoalService.updateSpendingGoal(
				spendingGoalId,
				budgetId,
				req.body,
				req.userId
			);
		res.json(updatedSpendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteSpendingGoal = async (req, res) => {
	const { spendingGoalId } = req.params;
	try {
		await spendingGoalService.deleteSpendingGoal(
			spendingGoalId,
			req.userId
		);
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
