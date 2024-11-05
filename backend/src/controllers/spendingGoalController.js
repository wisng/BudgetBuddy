const spendingGoalService = require("../services/spendingGoalService");

const createSpendingGoal = async (req, res) => {
	try {
		const spendingGoal = await spendingGoalService.createSpendingGoal(
			req.body
		);
		res.status(201).json(spendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getSpendingGoal = async (req, res) => {
	try {
		const spendingGoal = await spendingGoalService.getSpendingGoal(
			req.params.id
		);
		if (!spendingGoal)
			return res.status(404).json({ message: "SpendingGoal not found" });
		res.json(spendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAllSpendingGoal = async (req, res) => {
	try {
		const spendingGoal = await spendingGoalService.getAllSpendingGoal();
		res.json(spendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateSpendingGoal = async (req, res) => {
	try {
		const updatedspendingGoal =
			await spendingGoalService.updateSpendingGoal(
				req.params.id,
				req.body
			);
		res.json(updatedSpendingGoal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteSpendingGoal = async (req, res) => {
	try {
		await spendingGoalService.deleteSpendingGoal(req.params.id);
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
