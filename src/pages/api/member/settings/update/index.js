import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { User } from "~models";
import { findMember, sendError } from "~utils/helpers";
import {
	emailAlreadyTaken,
	missingMemberId,
	missingUpdateMemberParams,
	unableToLocateMember,
	usernameAlreadyTaken,
} from "~messages/errors";

/**
 * Updates an member's setting details.
 *
 * @function updateMemberSettings
 * @returns {string} - message
 * @throws {string}
 */
const updateMemberSettings = async (req, res) => {
	try {
		let updatedEmail = false;
		const { id: _id } = req.session.user;
		if (!_id) throw missingMemberId;

		const { email, emailReminders, firstName, lastName } = req.body;
		if (
			!email ||
			typeof emailReminders !== "boolean" ||
			!firstName ||
			!lastName
		)
			throw missingUpdateMemberParams;

		const existingMember = await findMember(req.session.user.id);
		if (!existingMember) throw unableToLocateMember;

		if (existingMember.email !== email) {
			updatedEmail = true;
			const emailInUse = await User.findOne({ email });
			if (emailInUse) throw emailAlreadyTaken;
		}

		const existingUser = await User.findOne({
			_id: { $ne: existingMember._id },
			firstName,
			lastName,
		});
		if (existingUser) throw usernameAlreadyTaken;

		await existingMember.updateOne({
			email,
			emailReminders,
			firstName,
			lastName,
		});

		const message = updatedEmail
			? "Your profile has been updated. Please re-log into your account with your new email address."
			: "Successfully updated your settings.";

		res.status(201).json({ message });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(updateMemberSettings));
