const express = require("express");
const authMiddleware = require("../utils/authMiddleware");
const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");
const budgetController = require("../controllers/budgetController");
const transactionController = require("../controllers/transactionController");
const passport = require("./passportConfig");

const router = express.Router();

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/google", authController.google);
router.get("/google/callback", authController.googleCallback);

// Budget Routes
router.post("/budget", authMiddleware, budgetController.createBudget);
router.get("/budget/:budgetId", authMiddleware, budgetController.getBudget);
router.get("/budgets", authMiddleware, budgetController.getAllBudgets);
router.delete(
	"/budget/:budgetId",
	authMiddleware,
	budgetController.deleteBudget
);

// Category Routes
router.post(
	"/budget/:budgetID/category",
	authMiddleware,
	categoryController.createCategory
);
router.get(
	"/budget/:budgetID/category/:categoryId",
	authMiddleware,
	categoryController.getCategory
);
router.get(
	"/budget/:budgetID/categories",
	authMiddleware,
	categoryController.getAllCategories
);
router.put(
	"/budget/:budgetID/category/:categoryId",
	authMiddleware,
	categoryController.updateCategory
);
router.delete(
	"/budget/:budgetID/category/:id",
	authMiddleware,
	categoryController.deleteCategory
);

// Transaction Routes
router.post(
	"/budget/:budgetID/transaction",
	authMiddleware,
	transactionController.createTransaction
);
router.get(
	"/budget/:budgetID/transaction/:transactionId",
	authMiddleware,
	transactionController.getTransaction
);
router.get(
	"/budget/:budgetID/transactions",
	authMiddleware,
	transactionController.getAllTransaction
);
router.put(
	"/budget/:budgetID/transaction/:transactionId",
	authMiddleware,
	transactionController.updateTransaction
);
router.delete(
	"/budget/:budgetID/transaction/:transactionId",
	authMiddleware,
	transactionController.deleteTransaction
);

// Spending Goal Routes
router.post(
	"/budget/:budgetID/spendinggoal",
	authMiddleware,
	budgetController.createSpendingGoal
);
router.get(
	"/budget/:budgetID/spendinggoal",
	authMiddleware,
	budgetController.getSpendingGoal
);
router.put(
	"/budget/:budgetID/spendinggoal",
	authMiddleware,
	budgetController.updateSpendingGoal
);
router.delete(
	"/budget/:budgetID/spendinggoal",
	authMiddleware,
	budgetController.deleteSpendingGoal
);

// Financial Report Routes
router.post(
	"/budget/:budgetID/financialreport",
	authMiddleware,
	budgetController.createFinancialReport
);
router.get(
	"/budget/:budgetID/financialreport",
	authMiddleware,
	budgetController.getFinancialReport
);
router.get(
	"/budget/:budgetID/financialreports",
	authMiddleware,
	budgetController.getAllFinancialReports
);
router.delete(
	"/budget/:budgetID/financialreport",
	authMiddleware,
	budgetController.deleteFinancialReport
);

module.exports = router;
