import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event, Form, Season } from "~models";
import { sendError } from "~utils/helpers";
import {
	seasonAlreadyExists,
	unableToLocateSeason,
	unableToUpdateSeason,
} from "~messages/errors";

/**
 * Updates an season's details.
 *
 * @function updateSeason
 * @returns {string} - message
 * @throws {string}
 */
const updateSeason = async (req, res) => {
	try {
		const { _id, seasonId, seasonDuration } = req.body;

		if (!_id || !seasonId || !seasonDuration) throw unableToUpdateSeason;

		const existingSeason = await Season.findOne({ _id });
		if (!existingSeason) throw unableToLocateSeason;

		if (existingSeason.seasonId !== seasonId) {
			const seasonInUse = await Season.findOne({ seasonId });
			if (seasonInUse) throw seasonAlreadyExists;
		}

		const [startDate, endDate] = seasonDuration;
		await existingSeason.updateOne({ seasonId, startDate, endDate });
		await Event.updateMany({ seasonId: existingSeason.seasonId }, { seasonId });
		await Form.updateMany({ seasonId: existingSeason.seasonId }, { seasonId });

		res.status(201).json({ message: "Successfully updated the season." });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateSeason));
