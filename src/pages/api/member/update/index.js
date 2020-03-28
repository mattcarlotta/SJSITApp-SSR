import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event, User } from "~models";
import { findMember, sendError } from "~utils/helpers";
import {
	emailAlreadyTaken,
	missingUpdateMemberParams,
	unableToLocateMember,
	usernameAlreadyTaken,
} from "~messages/errors";

/**
 * Updates an member's details.
 *
 * @function updateMember
 * @returns {string} - message
 * @throws {string}
 */
const updateMember = async (req, res) => {
	try {
		const { _id, email, emailReminders, firstName, lastName, role } = req.body;
		if (
			!_id ||
			!email ||
			typeof emailReminders !== "boolean" ||
			!firstName ||
			!lastName ||
			!role
		)
			throw missingUpdateMemberParams;

		const existingMember = await findMember(_id);
		if (!existingMember) throw unableToLocateMember;

		if (existingMember.email !== email) {
			const emailInUse = await User.findOne({ email });
			if (emailInUse) throw emailAlreadyTaken;
		}

		const existingUser = await User.findOne({
			_id: { $ne: existingMember._id },
			firstName,
			lastName,
		});
		if (existingUser) throw usernameAlreadyTaken;

		if (role === "staff") {
			await Event.updateMany(
				{},
				{
					$pull: {
						scheduledIds: existingMember._id,
						"schedule.$[].employeeIds": existingMember._id,
					},
				},
				{ multi: true },
			);
		}

		await existingMember.updateOne({
			email,
			emailReminders,
			firstName,
			lastName,
			role,
		});

		res
			.status(201)
			.json({ message: "Successfully updated the member profile." });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateMember));
