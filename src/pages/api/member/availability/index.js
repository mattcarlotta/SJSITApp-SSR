import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { findMember, findMemberAvailabilty, sendError } from "~utils/helpers";
import { unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's availability.
 *
 * @function getMemberAvailability
 * @returns {object} - memberAvailablity
 * @throws {string}
 */
const getMemberAvailability = async (req, res) => {
	try {
		const { id: _id, selectedDate } = req.query;

		const existingMember = await findMember(_id || req.session.user.id);
		if (!existingMember) throw unableToLocateMember;

		await findMemberAvailabilty(existingMember, selectedDate, res);
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(getMemberAvailability));
