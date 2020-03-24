import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event, Form, Season } from "~models";
import { sendError } from "~utils/helpers";
import { missingSeasonId, unableToDeleteSeason } from "~messages/errors";

/**
 * Deletes a season.
 *
 * @function deleteSeason
 * @returns {string} - message
 * @throws {string}
 */
const deleteSeason = async (req, res) => {
	try {
		const { id: _id } = req.params;
		if (!_id) throw missingSeasonId;

		const existingSeason = await Season.findOne({ _id });
		if (!existingSeason) throw unableToDeleteSeason;

		await existingSeason.deleteOne({ _id });
		await Event.deleteMany({ seasonId: existingSeason.seasonId });
		await Form.deleteMany({ seasonId: existingSeason.seasonId });

		res.status(200).json({ message: "Successfully deleted the season." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteSeason));
