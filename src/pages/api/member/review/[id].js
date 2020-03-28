import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { findMember, sendError } from "~utils/helpers";
import { missingMemberId, unableToLocateMember } from "~messages/errors";

/**
 * Retrieves a single member for editing/viewing.
 *
 * @function getMember
 * @returns {object} - member
 * @throws {string}
 */
const getMember = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingMemberId;

		const existingMember = await findMember(_id);
		if (!existingMember) throw unableToLocateMember;

		res.status(200).json({ member: existingMember });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getMember));
