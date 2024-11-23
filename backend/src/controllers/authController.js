const authService = require("../services/authService");
const budgetService = require("../services/budgetService");
const jwtUtil = require("../utils/jwtUtil");

const register = async (req, res) => {
	const { email, username, password, userType } = req.body;
	if (!email || !username || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}
	try {
		let token = await authService.registerUser(email, username, password, userType);
		res.status(201).json(token);
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
		let token = await authService.loginUser(email, password);
		return res.status(201).json(token);
	} catch (error) {
		res.status(401).json({ error });
	}
};


const google = async (req, res) => {
	passport.authenticate("google", { scope: ["profile", "email"] });
};

const googleCallback = async (req, res) => {
	passport.authenticate("google"),
		(req, res) => {
			let token = jwt.sign(
				{ id: req.user.id },
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
			res.json({ token });
		};
};

module.exports = { register, login, googleCallback, google };
