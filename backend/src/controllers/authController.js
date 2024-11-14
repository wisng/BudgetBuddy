const authService = require("../services/authService");
const jwtUtil = require("../utils/jwtUtil");

const register = async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}
	try {
		const token = await authService.registerUser(username, email, password);
		res.status(201).json(token);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const token = await authService.loginUser(req.body);
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
			const token = jwt.sign(
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
