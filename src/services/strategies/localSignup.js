import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
	expiredToken,
	invalidSignupEmail,
	invalidToken,
	missingSignupCreds,
	tokenAlreadyUsed,
	usernameAlreadyTaken,
} from "~messages/errors";
import { createDate, createRandomToken, sendError } from "~utils/helpers";
import { newUserTemplate } from "~services/templates";
import { User, Mail, Token } from "~models";

const { LOCALHOST } = process.env;

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				const { firstName, lastName, token } = req.body;

				const newToken = createRandomToken(); // a token used for email verification

				// see if the token is valid and hasn't been used already
				const validToken = await Token.findOne({ token });
				if (!validToken) throw invalidToken;
				if (validToken.authorizedEmail !== email) throw invalidSignupEmail;
				if (validToken.email) throw tokenAlreadyUsed;

				const existingUser = await User.findOne({ firstName, lastName });
				if (existingUser) throw usernameAlreadyTaken;

				// see if the token has expired
				const todaysDate = createDate();
				if (todaysDate > validToken.expiration) throw expiredToken;

				// hash password before attempting to create the user
				const newPassword = await User.createPassword(password);

				// create new user
				const newUser = await User.createUser({
					...req.body,
					password: newPassword,
					role: validToken.role,
					token: newToken,
					emailReminders: true,
					registered: createDate().toDate(),
				});

				// assign signup token to current user
				await Token.updateOne({ token }, { email: newUser.email });

				// send an email template for a new user signup
				await Mail.create({
					sendTo: `${newUser.firstName} ${newUser.lastName} <${newUser.email}>`,
					sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
					sendDate: createDate().toDate(),
					subject: "Welcome to the San Jose Sharks Ice Team!",
					message: newUserTemplate(
						LOCALHOST,
						newUser.firstName,
						newUser.lastName,
					),
				});

				return done(null, newUser);
			} catch (err) {
				return done(err, false);
			}
		},
	),
);

/**
 * Middleware function to register a user.
 *
 * @function localSignup
 * @returns {function}
 * @throws {string}
 */
export const localSignup = next => async (req, res) => {
	try {
		const { email, firstName, lastName, password, token } = req.body;

		if (!email || !firstName || !lastName || !password || !token)
			throw missingSignupCreds;

		const newUser = await new Promise((resolve, reject) => {
			passport.authenticate("local-signup", (err, user) =>
				err ? reject(err) : resolve(user),
			)(req, res, next);
		});

		req.user = {
			email: newUser.email,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
		};

		return next(req, res);
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default localSignup;
