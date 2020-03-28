import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Form } from "~models";
import { createDate, sendError } from "~utils/helpers";
import { missingFormId, unableToLocateForm } from "~messages/errors";

/**
 * Resend all form reminder emails.
 *
 * @function resendFormEmail
 * @returns {string} - message
 * @throws {string}
 */
const resendFormEmail = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingFormId;

		const existingForm = await Form.findOne({ _id }, { __v: 0 });
		if (!existingForm) throw unableToLocateForm;

		await existingForm.updateOne({
			sendEmailNotificationsDate: createDate().format(),
			sentEmails: false,
		});

		res.status(200).json({
			message: "Email notifications for that form will be resent shortly.",
		});
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(resendFormEmail));
