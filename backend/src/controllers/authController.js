const authService = require("../services/authService");
const budgetService = require("../services/budgetService");
const jwtUtil = require("../utils/jwtUtil");

const register = async (req, res) => {
	const { email, name, username, password, userType } = req.body;
	if (!email || !name || !username || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}
	try {
		let token = await authService.registerUser(email, name, username, password, userType);
		res.status(201).json(token);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};


// WAHAJ - CAUSING ERROR

// const login = async (req, res) => {
// 	const { identifier, password } = req.body;
// 	if (!identifier || !password) {
// 		return res.status(400).json({ error: "All fields are required" });
// 	}

// 	try {
// 		const token = await authService.loginUser(identifier, password);
// 		return res.status(201).json(token);
// 	} catch (error) {
// 		res.status(401).json({ error });
// 	}
// };

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
