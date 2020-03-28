import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { findMember, findMemberEvents, sendError } from "~utils/helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Find a single member.
 *
/**
 * Retrieves a single member's scheduled events.
 *
 * @function getMemberEvents
 * @returns {object} - events
 * @throws {string}
 */
const getMemberEvents = async (req, res) => {
	try {
		const { id: _id, selectedDate } = req.query;
		if (!_id) throw missingMemberId;

		const existingMember = await findMember(_id);
		if (!existingMember) throw unableToLocateMember;

		const events = await findMemberEvents(existingMember, selectedDate);

		res.status(200).json({ ...events[0] });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getMemberEvents));
