import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event, Token, User } from "~models";
import { sendError } from "~utils/helpers";
import { missingMemberId, unableToDeleteMember } from "~messages/errors";
import { avatarAPI } from "~utils/axiosConfig";
import { parseCookie } from "~utils/parseResponse";

/**
 * Deletes a member.
 *
 * @function deleteMember
 * @returns {string} - message
 * @throws {string}
 */
const deleteMember = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingMemberId;

		const existingUser = await User.findOne({ _id });
		if (!existingUser) throw unableToDeleteMember;

		const headers = parseCookie(req);
		await avatarAPI.delete(`delete/${_id}`, headers);

		await existingUser.delete();
		await Token.deleteOne({ email: existingUser.email });
		await Event.updateMany(
			{},
			{
				$pull: {
					scheduledIds: existingUser._id,
					"schedule.$[].employeeIds": existingUser._id,
					employeeResponses: { _id: existingUser._id },
				},
			},
			{ multi: true },
		);

		res.status(200).json({ message: "Successfully deleted the member." });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteMember));
