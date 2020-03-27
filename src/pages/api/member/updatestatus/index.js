import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event } from "~models";
import { findMember, sendError } from "~utils/helpers";
import { missingUpdateMemberStatusParams } from "~messages/errors";

/**
 * Updates an member's status (active/suspended).
 *
 * @function updateMemberStatus
 * @returns {string} - message
 * @throws {string}
 */
const updateMemberStatus = async (req, res) => {
	try {
		const { _id, status } = req.body;
		if (!_id || !status) throw missingUpdateMemberStatusParams;

		const wasSuspended = status === "active";

		const existingMember = await findMember(_id);

		await existingMember.updateOne({
			status: wasSuspended ? "suspended" : "active",
		});

		if (wasSuspended) {
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

		res.status(201).json({
			message: `Member has been ${wasSuspended ? "suspended" : "reactivated"}.`,
		});
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateMemberStatus));
