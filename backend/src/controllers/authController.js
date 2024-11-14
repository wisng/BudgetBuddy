const authService = require("../services/authService");
const budgetService = require("../services/budgetService");
const jwtUtil = require("../utils/jwtUtil");

const register = async (req, res) => {
	const { email, name, username, password, role } = req.body;
	if (!email || !name || !username || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const user = await authService.registerUser(email, name, username, password, role);

		// Create initial individual budget for new user
		if (role === "Client") {
			await budgetService.createBudget(user.userID);
		}

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const user = await authService.loginUser(email, password);
		const token = jwtUtil.generateToken(user);
		res.json({ token });
	} catch (error) {
		res.status(401).json({ error });
	}
};

module.exports = { register, login };
