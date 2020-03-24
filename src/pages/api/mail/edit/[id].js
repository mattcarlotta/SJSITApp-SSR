import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail } from "~models";
import { sendError } from "~utils/helpers";
import { missingMailId, unableToLocateMail } from "~messages/errors";

/**
 * Retrieves a single email for editing/viewing.
 *
 * @function getMailForViewing
 * @returns {object} - email
 * @throws {string}
 */
const getMailForViewing = async (req, res) => {
	try {
		const { id: _id } = req.params;
		if (!_id) throw missingMailId;

		const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
		if (!existingEmail) throw unableToLocateMail;

		res.status(200).json({ email: existingEmail });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getMailForViewing));
