import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { findMember, sendError } from "~utils/helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member's settings.
 *
 * @function getMemberSettings
 * @returns {object} - member
 * @throws {string}
 */
const getMemberSettings = async (req, res) => {
	try {
		const { id: _id } = req.session.user;
		if (!_id) throw missingMemberId;

		const existingMember = await findMember(_id);
		if (!existingMember) throw unableToLocateMember;

		res.status(200).json({ member: existingMember });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(getMemberSettings));
