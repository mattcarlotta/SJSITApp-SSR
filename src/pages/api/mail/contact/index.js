import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { Mail } from "~models";
import { createDate, getUsers, sendError } from "~utils/helpers";
import {
	invalidContactUsRequest,
	unableToLocateMembers,
} from "~messages/errors";

/**
 * Send an email to staff or admin.
 *
 * @function contactUs
 * @returns {string} - message
 * @throws {string}
 */
const contactUs = async (req, res) => {
	try {
		const { message, sendTo, subject } = req.body;
		if (!message || !sendTo || !subject) throw invalidContactUsRequest;

		const role = sendTo.toLowerCase();

		const members = await getUsers({
			match: {
				role: { $eq: role },
			},
			project: {
				id: 1,
				email: {
					$concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"],
				},
			},
		});
		/* istanbul ignore next */
		if (isEmpty(members)) throw unableToLocateMembers;

		const mailingAddresses = members.map(({ email }) => email);
		const { firstName, lastName, email } = req.session.user;

		await Mail.create({
			sendTo: mailingAddresses,
			sendFrom: `${firstName} ${lastName} <${email}>`,
			sendDate: createDate().toDate(),
			subject,
			message: `<span>${message}</span>`,
		});

		res.status(201).json({
			message: `Thank you for contacting us. The ${role} has received your message. Expect a response within 24 hours.`,
		});
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(contactUs));
