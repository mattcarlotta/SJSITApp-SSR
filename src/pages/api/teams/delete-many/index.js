import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Team } from "~models";
import { sendError } from "~utils/helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many events.
 *
 * @function deleteManyTeams
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyTeams = async (req, res) => {
	try {
		const { ids } = req.body;
		if (isEmpty(ids)) throw missingIds;

		await Team.deleteMany({ _id: { $in: ids } });

		res.status(200).json({ message: "Successfully deleted the teams." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteManyTeams));
