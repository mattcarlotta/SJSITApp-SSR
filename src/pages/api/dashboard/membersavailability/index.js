import moment from "moment-timezone";
import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Event, Form, User } from "~models";
import {
	createDate,
	createMemberAvailabilityAverages,
	getEventCounts,
	sendError,
} from "~utils/helpers";

/**
 * Retrieves all members availabilty for a percentage table.
 *
 * @function getAvailability
 * @returns {object} - membersAvailability: { eventCounts, eventResponses, members }), months (start month, endmonth),
 * @throws {string}
 */
const getAvailabilityForAllMembers = async (_, res) => {
	try {
		const membersAvailability = [];
		let months = [];

		const members = await User.aggregate([
			{
				$match: {
					role: { $eq: "employee" },
					status: "active",
				},
			},
			{ $sort: { lastName: 1 } },
			{
				$project: {
					id: 1,
					name: {
						$concat: ["$firstName", " ", "$lastName"],
					},
				},
			},
		]);
		/* istanbul ignore next */
		if (isEmpty(members))
			return res.status(200).json({ membersAvailability, months });

		const currentDate = createDate().add(1, "months").toDate();

		const existingForm = await Form.findOne(
			{
				startMonth: {
					$lte: currentDate,
				},
				endMonth: {
					$gte: currentDate,
				},
			},
			{
				__v: 0,
				sentEmails: 0,
				seasonId: 0,
				sendEmailNotificationsDate: 0,
			},
		).lean();
		/* istanbul ignore next */
		if (!existingForm)
			return res.status(200).json({ membersAvailability, months });

		const startOfMonth = moment(existingForm.startMonth).toDate();
		const endOfMonth = moment(existingForm.endMonth).toDate();
		months = [startOfMonth, endOfMonth];

		const eventCounts = await getEventCounts(startOfMonth, endOfMonth);
		/* istanbul ignore next */
		if (eventCounts === 0)
			return res.status(200).json({ membersAvailability, months });

		const eventResponses = await Event.aggregate([
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
					path: "$employeeResponses",
				},
			},
			{
				$group: {
					_id: "$employeeResponses._id",
					availability: {
						$sum: {
							$cond: [
								{
									$in: [
										"$employeeResponses.response",
										["Available to work.", "I want to work."],
									],
								},
								1,
								0,
							],
						},
					},
				},
			},
		]);

		res.status(200).json({
			membersAvailability: createMemberAvailabilityAverages({
				eventCounts,
				eventResponses,
				members,
			}),
			months,
		});
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAvailabilityForAllMembers));
