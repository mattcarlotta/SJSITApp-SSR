import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail } from "~models";
import { sendError } from "~utils/helpers";
import { missingMailId, unableToDeleteMail } from "~messages/errors";

/**
 * Deletes mail.
 *
 * @function deleteMail
 * @returns {string} - message
 * @throws {string}
 */
const deleteMail = async (req, res) => {
	try {
		const { id: _id } = req.params;
		if (!_id) throw missingMailId;

		const existingMail = await Mail.findOne({ _id });
		if (!existingMail) throw unableToDeleteMail;

		await existingMail.delete();

		res.status(200).json({ message: "Successfully deleted the email." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteMail));
