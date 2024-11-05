const financialReportService = require("../services/FinancialReportService");

const createFinancialReport = async (req, res) => {
	try {
		const financialReport =
			await financialReportService.createFinancialReport(req.body);
		res.status(201).json(financialReport);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getFinancialReport = async (req, res) => {
	try {
		const financialReport = await financialReportService.getFinancialReport(
			req.params.id
		);
		if (!financialReport)
			return res
				.status(404)
				.json({ message: "FinancialReport not found" });
		res.json(financialReport);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAllFinancialReport = async (req, res) => {
	try {
		const financialReport =
			await financialReportService.getAllFinancialReport();
		res.json(financialReport);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateFinancialReport = async (req, res) => {
	try {
		const updatedFinancialReport =
			await financialReportService.updateFinancialReport(
				req.params.id,
				req.body
			);
		res.json(updatedFinancialReport);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteFinancialReport = async (req, res) => {
	try {
		await financialReportService.deleteFinancialReport(req.params.id);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createFinancialReport,
	getFinancialReport,
	getAllFinancialReport,
	updateFinancialReport,
	deleteFinancialReport,
};
