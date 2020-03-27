import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Season } from "~models";
import { sendError } from "~utils/helpers";
import { needToCreateSeasonFirst } from "~messages/errors";

/**
 * Retrieves all seasonsIds.
 *
 * @function getAllSeasonIds
 * @returns {object} - seasonsIds
 * @throws {string}
 */
const getAllSeasonIds = async (_, res) => {
	try {
		const seasons = await Season.aggregate([
			{ $sort: { startDate: -1 } },
			{ $group: { _id: null, seasonIds: { $push: "$seasonId" } } },
			{ $project: { _id: 0, seasonIds: 1 } },
		]);
		/* istanbul ignore next */
		if (isEmpty(seasons)) throw needToCreateSeasonFirst;

		res.status(200).json({ seasonIds: seasons[0].seasonIds });
	} catch (err) {
		/* istanbul ignore next */
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAllSeasonIds));
