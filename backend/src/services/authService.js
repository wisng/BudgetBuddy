const userService = require("./userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (email, name, username, password, role) => {
	console.log(`Registering user ${name} with info: ${email}, ${username}, ${role}`);
	return await userService.createUser(email, name, username, password, role);
};

const loginUser = async (email, password) => {
	try {
		const user = await userService.findUserByEmail(email);
		if (!user) throw new Error("Invalid email or password");

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) throw new Error("Invalid email or password");

		// Add jwt tokens when frontend is ready
		const token = jwt.sign(
			{ userId: user.userId, accountType: user.accountType },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		// return { token, message: "Login successful" };
		return { token, user };
		// return { message: "Login successful" };
	} catch (error) {
		throw error;
	}
};

module.exports = { registerUser, loginUser };
