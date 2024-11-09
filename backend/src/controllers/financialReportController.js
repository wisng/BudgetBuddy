const financialReportService = require("../services/financialReportService");

const createFinancialReport = async (req, res) => {
	try {
		const { budgetId } = req.params;
		const userId = req.userId;
		const data = req.body;
		const report = await financialReportService.createFinancialReport(
			budgetId,
			userId,
			data
		);
		res.status(201).json(report);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getFinancialReport = async (req, res) => {
	try {
		const { budgetId } = req.params;
		const userId = req.userId;
		const report = await financialReportService.getFinancialReport(
			budgetId,
			userId
		);
		res.json(report);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllFinancialReports = async (req, res) => {
	try {
		const userId = req.userId;
		const reports = await financialReportService.getAllFinancialReports(
			userId
		);
		res.json(reports);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteFinancialReport = async (req, res) => {
	try {
		const { budgetId } = req.params;
		const userId = req.userId;
		await financialReportService.deleteFinancialReport(budgetId, userId);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createFinancialReport,
	getFinancialReport,
	getAllFinancialReports,
	deleteFinancialReport,
};
