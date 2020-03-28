import get from "lodash.get";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event } from "~models";
import {
	generateFilters,
	sendError,
	sortScheduledUsersByLastName,
} from "~utils/helpers";

/**
 * Retrieves all events for ViewEvents page.
 *
 * @function getAllEvents
 * @returns {object} - sorted events and total event documents
 * @throws {string}
 */
const getAllEvents = async (req, res) => {
	try {
		const { page } = req.query;

		const filters = generateFilters(req.query);

		const results = await Event.paginate(
			{ ...filters },
			{
				lean: true,
				sort: { eventDate: -1 },
				page,
				limit: 10,
				select: "-schedule -__v",
				populate: {
					path: "scheduledIds",
					select: "firstName lastName",
				},
			},
		);

		const events = get(results, ["docs"]);
		const totalDocs = get(results, ["totalDocs"]);

		res
			.status(200)
			.json({ events: sortScheduledUsersByLastName(events), totalDocs });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAllEvents));
