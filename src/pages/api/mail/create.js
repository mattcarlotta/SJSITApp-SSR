import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail } from "~models";
import { createDate, getStartOfDay, sendError } from "~utils/helpers";
import { invalidSendDate, unableToCreateNewMail } from "~messages/errors";

/**
 * Creates a new mail.
 *
 * @function createMail
 * @returns {string} - message
 * @throws {string}
 */
const createMail = async (req, res) => {
	try {
		const { message, sendDate, sendFrom, sendTo, subject } = req.body;

		if (!message || !sendTo || !sendFrom || !subject)
			throw unableToCreateNewMail;

		const currentDay = getStartOfDay();
		const sendEmailDate = createDate(sendDate);
		if (sendEmailDate.format() < currentDay) throw invalidSendDate;

		const sentDateMessage = sendDate
			? sendEmailDate.format("MMMM Do YYYY @ hh:mm a")
			: "shortly";

		await Mail.create({
			message,
			sendDate: sendEmailDate.format(),
			sendFrom,
			sendTo,
			subject,
		});

		res.status(201).json({
			message: `An email has been created and will be sent ${sentDateMessage}!`,
		});
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(createMail));
