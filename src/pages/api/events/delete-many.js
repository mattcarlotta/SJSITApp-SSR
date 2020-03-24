import isEmpty from "lodash/isEmpty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event } from "~models";
import { sendError } from "~utils/helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many events.
 *
 * @function deleteManyEvents
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyEvents = async (req, res) => {
	try {
		const { ids } = req.body;
		if (isEmpty(ids)) throw missingIds;

		await Event.deleteMany({ _id: { $in: ids } });

		res.status(200).json({ message: "Successfully deleted the events." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteManyEvents));
