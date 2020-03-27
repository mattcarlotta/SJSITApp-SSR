import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { Event } from "~models";
import { convertId, getMonthDateRange, sendError } from "~utils/helpers";

/**
 * Retrieves all events for Schedule page by filters.
 *
 * @function getScheduledEvents
 * @returns {object} - events
 * @throws {string}
 */
const getScheduledEvents = async (req, res) => {
	try {
		const { id, selectedDate, selectedGames } = req.query;

		const selected = !selectedGames ? "All Games" : selectedGames;

		const selectedId = id || req.session.user.id;

		const { startOfMonth, endOfMonth } = getMonthDateRange(selectedDate);

		const filters =
			selected === "All Games"
				? {
						eventDate: {
							$gte: startOfMonth,
							$lte: endOfMonth,
						},
				  }
				: {
						eventDate: {
							$gte: startOfMonth,
							$lte: endOfMonth,
						},
						scheduledIds: {
							$in: [convertId(selectedId)],
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
				__v: 0,
			},
			{ sort: { eventDate: 1 } },
		).populate({
			path: "schedule.employeeIds",
			select: "_id firstName lastName",
		});

		res.status(200).json({ events });
	} catch (err) {
		/* istanbul ignore next */
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(getScheduledEvents));
