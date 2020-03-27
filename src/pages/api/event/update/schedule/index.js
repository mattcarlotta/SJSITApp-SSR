import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { findEventById, sendError, updateScheduleIds } from "~utils/helpers";
import {
	invalidUpdateEventRequest,
	unableToLocateEvent,
} from "~messages/errors";

/**
 * Updates an event's schedule.
 *
 * @function updateEventSchedule
 * @returns {string} - message
 * @throws {string}
 */
const updateEventSchedule = async (req, res) => {
	try {
		const { _id, schedule } = req.body;
		if (!_id || isEmpty(schedule)) throw invalidUpdateEventRequest;

		const existingEvent = await findEventById(_id);
		if (!existingEvent) throw unableToLocateEvent;

		await existingEvent.updateOne({
			$set: { schedule, scheduledIds: updateScheduleIds(schedule) },
		});

		res
			.status(201)
			.json({ message: "Successfully updated the event's schedule." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateEventSchedule));
