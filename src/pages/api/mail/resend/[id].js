import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail } from "~models";
import { createDate, sendError } from "~utils/helpers";
import { missingMailId, unableToLocateMail } from "~messages/errors";

/**
 * Resends an email.
 *
 * @function resendMail
 * @returns {string} - message
 * @throws {string}
 */
const resendMail = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingMailId;

		const existingEmail = await Mail.findOne({ _id }, { __v: 0 });
		if (!existingEmail) throw unableToLocateMail;

		await existingEmail.updateOne({
			sendDate: createDate().format(),
			status: "unsent",
		});

		res.status(200).json({ message: "That email will be resent shortly." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(resendMail));
