const userService = require("./userService");

const registerUser = async (email, password) => {
	return await userService.createUser(email, password);
};

module.exports = { registerUser };
