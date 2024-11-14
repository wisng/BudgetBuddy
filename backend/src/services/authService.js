const userService = require("./userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (email, name, username, email, password, userType) => {
	try {
		const userId = await userService.createUser(email, name username, email, password, userType);
		const user = await userService.findUserById(userId);
		const token = jwt.sign(
			{ userId: user.userId, userType: user.userType },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return { token: token };
	} catch (error) {
		throw error;
	}
};

const loginUser = async (identifier, password) => {
	try {
		const user = await userService.findUser(identifier);
		if (!user) throw new Error("Invalid email/username or password");

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid)
			throw new Error("Invalid email/username or password");

		const token = jwt.sign(
			{ userId: user.userId, accountType: user.accountType },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return { token: token };
	} catch (error) {
		throw error;
	}
};

module.exports = { registerUser, loginUser };
