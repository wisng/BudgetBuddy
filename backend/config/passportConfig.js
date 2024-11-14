const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userService = require("./userService");
require("dotenv").config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await userService.findUserByGoogleId(profile.id);

				if (!user) {
					const newUser = {
						googleId: profile.id,
						email: profile.emails[0].value,
						name: profile.displayName,
					};
					user = await userService.createUser(newUser);
				}

				done(null, user);
			} catch (error) {
				done(error, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

module.exports = passport;
