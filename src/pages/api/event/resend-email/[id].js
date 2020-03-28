import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { findEventById, sendError } from "~utils/helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";

/**
 * Resend event reminder emails.
 *
 * @function resendEventEmail
 * @returns {string} - message
 * @throws {string}
 */
const resendEventEmail = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingEventId;

		const existingEvent = await findEventById(_id);
		if (!existingEvent) throw unableToLocateEvent;

		await existingEvent.updateOne({
			sentEmailReminders: false,
		});

		res.status(200).json({
			message:
				"Email notifications for that event will be resent within 24 hours of the event date.",
		});
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(resendEventEmail));
