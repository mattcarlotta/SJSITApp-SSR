import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Season } from "~models";
import { sendError } from "~utils/helpers";
import { seasonAlreadyExists, unableToCreateNewSeason } from "~messages/errors";

/**
 * Creates a new season.
 *
 * @function createSeason
 * @returns {string} - message
 * @throws {string}
 */
const createSeason = async (req, res) => {
	try {
		const { seasonId, seasonDuration } = req.body;

		if (!seasonId || !seasonDuration) throw unableToCreateNewSeason;

		const seasonExists = await Season.findOne({ seasonId });
		if (seasonExists) throw seasonAlreadyExists;

		const [startDate, endDate] = seasonDuration;
		await Season.create({ seasonId, startDate, endDate });
		res.status(201).json({ message: "Successfully created a new season!" });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(createSeason));
