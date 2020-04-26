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
	missingUpdateTokenParams,
	unableToLocateToken,
	unableToUpdateToken,
} from "~messages/errors";

/**
 * Updates an token's details.
 *
 * @function updateToken
 * @returns {string} - message
 * @throws {string}
 */
const updateToken = async (req, res) => {
	try {
		const { _id, authorizedEmail, role } = req.body;
		if (!_id || !authorizedEmail || !role) throw missingUpdateTokenParams;

		const existingToken = await Token.findOne({ _id });
		if (!existingToken) throw unableToLocateToken;
		if (existingToken.email) throw unableToUpdateToken;

		let emailInUse;
		if (existingToken.authorizedEmail !== authorizedEmail) {
			emailInUse = await Token.findOne(
				{
					authorizedEmail,
				},
				{ token: 1 },
			).lean();
		} else {
			emailInUse = await Token.findOne(
				{ email: authorizedEmail },
				{ token: 1 },
			).lean();
		}
		if (emailInUse) throw emailAssociatedWithKey;

		const token = createSignupToken();
		const expiration = expirationDate();

		await existingToken.updateOne({
			authorizedEmail,
			expiration,
			role,
			token,
		});

		await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

		res.status(201).json({
			message: `Successfully updated and sent a new authorization key to ${authorizedEmail}.`,
		});
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateToken));
