import isEmpty from "lodash.isempty";
import isEqual from "lodash.isequal";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import {
	createSchedule,
	findEventById,
	sendError,
	uniqueArray,
} from "~utils/helpers";
import {
	invalidUpdateEventRequest,
	mustContainUniqueCallTimes,
	unableToLocateEvent,
} from "~messages/errors";

/**
 * Updates an event's details.
 *
 * @function updateEvent
 * @returns {string} - message
 * @throws {string}
 */
const updateEvent = async (req, res) => {
	try {
		const {
			_id,
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
			!_id ||
			isEmpty(callTimes) ||
			!eventDate ||
			!eventType ||
			!location ||
			!seasonId ||
			!team ||
			!uniform
		)
			throw invalidUpdateEventRequest;

		const uniqueCallTimes = uniqueArray(callTimes);
		if (!uniqueCallTimes) throw mustContainUniqueCallTimes;

		const existingEvent = await findEventById(_id);
		if (!existingEvent) throw unableToLocateEvent;

		const schedule = createSchedule(callTimes);
		const scheduleUnchanged = isEqual(existingEvent.callTimes, callTimes);

		await existingEvent.updateOne({
			callTimes,
			eventDate,
			eventType,
			location,
			notes,
			opponent,
			seasonId,
			team,
			uniform,
			schedule: scheduleUnchanged ? existingEvent.schedule : schedule,
			scheduledIds: scheduleUnchanged ? existingEvent.scheduledIds : [],
		});

		res.status(201).json({ message: "Successfully updated the event." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateEvent));
