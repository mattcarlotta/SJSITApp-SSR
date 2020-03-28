import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { findMember, findMemberEvents, sendError } from "~utils/helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's settings events schedule.
 *
 * @function getMemberSettingsEvents
 * @returns {object} - events
 * @throws {string}
 */
const getMemberSettingsEvents = async (req, res) => {
	try {
		const { selectedDate } = req.query;
		const { id: _id } = req.session.user;
		if (!_id) throw missingMemberId;

		const existingMember = await findMember(_id);
		if (!existingMember) throw unableToLocateMember;

		const events = await findMemberEvents(existingMember, selectedDate);

		res.status(200).json({ ...events[0] });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(getMemberSettingsEvents));
