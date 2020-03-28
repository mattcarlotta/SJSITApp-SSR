import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail } from "~models";
import { createDate, getStartOfDay, sendError } from "~utils/helpers";
import {
	invalidSendDate,
	unableToLocateMail,
	unableToUpdateMail,
} from "~messages/errors";

/**
 * Updates an email's details.
 *
 * @function updateMail
 * @returns {string} - message
 * @throws {string}
 */
const updateMail = async (req, res) => {
	try {
		const { _id, message, sendDate, sendFrom, sendTo, subject } = req.body;

		if (!_id || !message || !sendFrom || !sendTo || !subject)
			throw unableToUpdateMail;

		const emailExists = await Mail.findOne({ _id });
		if (!emailExists) throw unableToLocateMail;

		const currentDay = getStartOfDay();
		const sendEmailDate = createDate(sendDate);
		if (sendEmailDate.format() < currentDay) throw invalidSendDate;

		const sentDateMessage = sendDate
			? sendEmailDate.format("MMMM Do YYYY @ hh:mm a")
			: "shortly";

		await emailExists.updateOne({
			message,
			sendDate: sendEmailDate.format(),
			sendFrom,
			sendTo,
			subject,
			sent: false,
			sendError: "",
		});

		res.status(201).json({
			message: `Successfully updated the email and it will be sent ${sentDateMessage}!`,
		});
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateMail));
