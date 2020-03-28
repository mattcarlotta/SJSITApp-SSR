import moment from "moment-timezone";
import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event, Season } from "~models";
import { sendError, uniqueArray } from "~utils/helpers";
import {
	invalidCreateEventRequest,
	invalidEventDate,
	mustContainUniqueCallTimes,
	unableToLocateSeason,
} from "~messages/errors";

/**
 * Creates a new event.
 *
 * @function createEvent
 * @returns {string} - message
 * @throws {string}
 */
const createEvent = async (req, res) => {
	try {
		const {
			callTimes,
			eventDate,
			eventType,
			location,
			notes,
			opponent,
			seasonId,
			team,
			uniform,
		} = req.body;
		if (
			isEmpty(callTimes) ||
			!eventDate ||
			!eventType ||
			!location ||
			!seasonId ||
			!team ||
			!uniform
		)
			throw invalidCreateEventRequest;

		const uniqueCallTimes = uniqueArray(callTimes);
		if (!uniqueCallTimes) throw mustContainUniqueCallTimes;

		const existingSeason = await Season.findOne({ seasonId });
		if (!existingSeason) throw unableToLocateSeason;

		const eventDateStartTime = moment(eventDate);
		const seasonStart = moment(existingSeason.startDate);
		const seasonEnd = moment(existingSeason.endDate);

		if (eventDateStartTime < seasonStart || eventDateStartTime > seasonEnd) {
			throw invalidEventDate(
				seasonId,
				seasonStart.format("L"),
				seasonEnd.format("L"),
			);
		}

		await Event.create({
			callTimes,
			eventDate,
			eventType,
			location,
			notes,
			opponent,
			seasonId,
			team,
			uniform,
		});

		res.status(202).json({
			message: `Successfully added a new event to the ${seasonId} season.`,
		});
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(createEvent));
