const financialReportService = require("../services/financialReportService");

const createFinancialReport = async (req, res) => {
	try {
		const { budgetID } = req.params;
		const userID = req.userID;
		const data = req.body;
		const report = await financialReportService.createFinancialReport(
			budgetID,
			userID,
			data
		);
		res.status(201).json(report);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getFinancialReport = async (req, res) => {
	try {
		const { budgetID } = req.params;
		const userID = req.userID;
		const report = await financialReportService.getFinancialReport(
			budgetID,
			userID
		);
		res.json(report);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllFinancialReports = async (req, res) => {
	try {
		const userID = req.userID;
		const reports = await financialReportService.getAllFinancialReports(
			userID
		);
		res.json(reports);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteFinancialReport = async (req, res) => {
	try {
		const { budgetID } = req.params;
		const userID = req.userID;
		await financialReportService.deleteFinancialReport(budgetID, userID);
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
