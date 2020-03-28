import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Season } from "~models";
import { sendError } from "~utils/helpers";
import { missingSeasonId, unableToLocateSeason } from "~messages/errors";

/**
 * Retrieves a single season for editing/viewing.
 *
 * @function getSeasonForViewing
 * @returns {object} - season
 * @throws {string}
 */
const getSeasonForViewing = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingSeasonId;

		const existingSeason = await Season.findOne({ _id });
		if (!existingSeason) throw unableToLocateSeason;

		res.status(200).json({ season: existingSeason });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getSeasonForViewing));
