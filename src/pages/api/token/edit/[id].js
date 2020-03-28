import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Token } from "~models";
import { sendError } from "~utils/helpers";
import {
	missingTokenId,
	unableToLocateToken,
	unableToUpdateToken,
} from "~messages/errors";

/**
 * Retrieves a single token (authorization key) for editing/viewing.
 *
 * @function getTokenForViewing
 * @returns {object} - token
 * @throws {string}
 */
const getTokenForViewing = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingTokenId;

		const existingToken = await Token.findOne({ _id }, { __v: 0, token: 0 });
		if (!existingToken) throw unableToLocateToken;
		if (existingToken.email) throw unableToUpdateToken;

		res.status(200).json({ token: existingToken });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getTokenForViewing));
