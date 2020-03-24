import isEmpty from "lodash/isEmpty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event } from "~models";
import {
	createMemberEventCount,
	findEventById,
	getMonthDateRange,
	getUsers,
	sendError,
} from "~utils/helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";

/**
 * Retrieves members' event counts.
 *
 * @function getMemberEventCounts
 * @returns {object} - members
 * @throws {string}
 */
const getMemberEventCounts = async (req, res) => {
	try {
		const { eventId } = req.query;
		if (!eventId) throw missingEventId;

		const members = await getUsers({
			match: {
				role: { $eq: "employee" },
				status: "active",
			},
			project: {
				_id: 1,
				name: { $concat: ["$firstName", " ", "$lastName"] },
			},
		});
		/* istanbul ignore next */
		if (isEmpty(members)) return res.status(200).json({ members: [] });

		const existingEvent = await findEventById(eventId);
		if (!existingEvent) throw unableToLocateEvent;

		const { startOfMonth, endOfMonth } = getMonthDateRange(
			existingEvent.eventDate,
		);

		const memberEventCounts = await Event.aggregate([
			{
				$match: {
					eventDate: {
						$gte: startOfMonth,
						$lte: endOfMonth,
					},
				},
			},
			{
				$unwind: {
					path: "$scheduledIds",
					preserveNullAndEmptyArrays: false,
				},
			},
			{
				$group: {
					_id: "$scheduledIds",
					eventCount: { $sum: 1 },
				},
			},
		]);
		if (isEmpty(memberEventCounts))
			return res.status(200).json({ members: [] });

		res.status(200).json({
			members: createMemberEventCount({
				members,
				memberEventCounts,
			}),
		});
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getMemberEventCounts));
