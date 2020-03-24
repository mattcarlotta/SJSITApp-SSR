import get from "lodash/get";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Season } from "~models";
import { sendError } from "~utils/helpers";

/**
 * Retrieves all seasons for ViewSeason page.
 *
 * @function getAllSeasons
 * @returns {object} - seasons and total season documents
 * @throws {string}
 */
const getAllSeasons = async (req, res) => {
	try {
		const { page } = req.query;

		const results = await Season.paginate(
			{},
			{
				sort: { startDate: -1 },
				page,
				limit: 10,
				select: "seasonId startDate endDate",
			},
		);

		const seasons = get(results, ["docs"]);
		const totalDocs = get(results, ["totalDocs"]);

		res.status(200).json({ seasons, totalDocs });
	} catch (err) {
		/* istanbul ignore next */
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAllSeasons));
