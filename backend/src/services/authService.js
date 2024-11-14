const userService = require("./userService");
const jwtUtil = require("../utils/jwtUtil");
const bcrypt = require("bcryptjs");

const registerUser = async (username, email, password) => {
	try {
		const userID = await userService.createUser(username, email, password);
		const user = await userService.findUserByID(userID);
		const token = jwtUtil.generateToken(user.userID, user.userType);

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

		const token = jwtUtil.generateToken(user.userID, user.userType);

		return { token: token };
	} catch (error) {
		throw error;
	}
};

module.exports = { registerUser, loginUser };
