import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { findMember, findMemberAvailabilty, sendError } from "~utils/helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's settings availability.
 *
 * @function getMemberSettingsAvailability
 * @returns {object} - memberAvailablity
 * @throws {string}
 */
const getMemberSettingsAvailability = async (req, res) => {
	try {
		const { selectedDate } = req.query;
		const { id: _id } = req.session.user;
		if (!_id) throw missingMemberId;

		const existingMember = await findMember(_id);
		if (!existingMember) throw unableToLocateMember;

		await findMemberAvailabilty(existingMember, selectedDate, res);
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(getMemberSettingsAvailability));
