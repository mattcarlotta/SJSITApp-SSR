import moment from "moment-timezone";
import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { Event } from "~models";
import {
	convertId,
	getEndOfDay,
	getStartOfDay,
	sendError,
} from "~utils/helpers";
import { missingMemberId } from "~messages/errors";

/**
 * Retrieves today or upcoming events.
 *
 * @function getSelectedEvents
 * @returns {object} - events
 * @throws {string}
 */
const getSelectedEvents = async (req, res) => {
	try {
		const { id: _id } = req.session.user;
		if (!_id) throw missingMemberId;
		const { selectedEvent } = req.params;

		const isEventToday = selectedEvent === "today";
		const currentDate = getStartOfDay();
		const endOfDay = getEndOfDay();
		const withinAWeek = moment().add(7, "days").endOf("day").format();

		const filters = isEventToday
			? {
					eventDate: {
						$gte: currentDate,
						$lte: endOfDay,
					},
			  }
			: {
					eventDate: {
						$gte: endOfDay,
						$lte: withinAWeek,
					},
					scheduledIds: {
						$in: [convertId(_id)],
					},
			  };

		const events = await Event.find(
			{
				...filters,
			},
			{
				seasonId: 0,
				callTimes: 0,
				employeeResponses: 0,
				sentEmailReminders: 0,
				scheduledIds: 0,
				__v: 0,
			},
			{ sort: { eventDate: 1 } },
		)
			.populate({
				path: "schedule.employeeIds",
				select: "_id firstName lastName",
			})
			.limit(2)
			.lean();

		res.status(200).json({ events });
	} catch (err) {
		/* istanbul ignore next */
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(getSelectedEvents));
