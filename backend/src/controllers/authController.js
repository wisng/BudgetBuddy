const authService = require("../services/authService");

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

module.exports = { register };
