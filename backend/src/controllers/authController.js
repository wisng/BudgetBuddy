const authService = require("../services/authService");
const jwtUtil = require("../utils/jwtUtil");

const register = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		await authService.registerUser(email, password);
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
