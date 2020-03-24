import moment from "moment-timezone";
import isEmpty from "lodash/isEmpty";
import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { Event } from "~models";
import { createMemberEventCount, getUsers, sendError } from "~utils/helpers";
import { missingDates } from "~messages/errors";

/**
 * Retrieves all members event distribution for a bar chart.
 *
 * @function getEventDistribution
 * @returns {object} - members: { members, memberEventCounts }
 * @throws {string}
 */
const getEventDistribution = async (req, res) => {
	try {
		const { startDate, endDate } = req.query;
		if (!startDate || !endDate) throw missingDates;

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

		const memberEventCounts = await Event.aggregate([
			{
				$match: {
					eventDate: {
						$gte: moment(startDate).toDate(),
						$lte: moment(endDate).toDate(),
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
		/* istanbul ignore next */
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(getEventDistribution));
