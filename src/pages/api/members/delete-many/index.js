import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { User } from "~models";
import { sendError } from "~utils/helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many members.
 *
 * @function deleteManyMembers
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyMembers = async (req, res) => {
	try {
		const { ids } = req.body;
		if (isEmpty(ids)) throw missingIds;

		await User.deleteMany({ _id: { $in: ids } });

		res.status(200).json({ message: "Successfully deleted the members." });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteManyMembers));
