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
	missingTokenId,
	unableToLocateToken,
	unableToUpdateToken,
} from "~messages/errors";

/**
 * Resend token emails.
 *
 * @function resendToken
 * @returns {string} - message
 * @throws {string}
 */
const resendToken = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingTokenId;

		const existingToken = await Token.findOne({ _id }, { __v: 0, token: 0 });
		if (!existingToken) throw unableToLocateToken;
		if (existingToken.email) throw unableToUpdateToken;

		const { authorizedEmail, role } = existingToken;

		const token = createSignupToken();
		const expiration = expirationDate();

		await existingToken.updateOne({
			expiration: expiration.toDate(),
			token,
		});

		await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

		res.status(201).json({
			message: `An authorization key will be resent to ${authorizedEmail} shortly.`,
		});
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(resendToken));
