import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event, Form, Season } from "~models";
import { sendError } from "~utils/helpers";
import { missingIds, unableToDeleteSeasons } from "~messages/errors";

/**
 * Deletes many seasons.
 *
 * @function deleteManySeasons
 * @returns {string} - message
 * @throws {string}
 */
const deleteManySeasons = async (req, res) => {
	try {
		const { ids } = req.body;
		if (isEmpty(ids)) throw missingIds;

		const existingSeasons = await Season.find({ _id: { $in: ids } });
		if (isEmpty(existingSeasons)) throw unableToDeleteSeasons;

		const seasonIds = existingSeasons.map(({ seasonId }) => seasonId);

		await Season.deleteMany({ _id: { $in: ids } });
		await Event.deleteMany({ seasonId: { $in: seasonIds } });
		await Form.deleteMany({ seasonId: { $in: seasonIds } });

		res.status(200).json({ message: "Successfully deleted the seasons." });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteManySeasons));
