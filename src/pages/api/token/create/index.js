import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail, Token } from "~models";
import {
	createAuthMail,
	createSignupToken,
	expirationDate,
	sendError,
} from "~utils/helpers";
import {
	emailAssociatedWithKey,
	invalidAuthTokenRequest,
} from "~messages/errors";

/**
 * Creates a new token (authorization key).
 *
 * @function createToken
 * @returns {string} - message
 * @throws {string}
 */
const createToken = async (req, res) => {
	try {
		const { authorizedEmail, role } = req.body;
		if (!authorizedEmail || !role) throw invalidAuthTokenRequest;

		const emailExists = await Token.findOne({ authorizedEmail });
		if (emailExists) throw emailAssociatedWithKey;

		const token = createSignupToken();
		const expiration = expirationDate();

		await Token.create({
			authorizedEmail,
			expiration: expiration.toDate(),
			token,
			role,
		});

		await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

		res.status(201).json({
			message: `Succesfully created and sent an authorization key to ${authorizedEmail}.`,
		});
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(createToken));
