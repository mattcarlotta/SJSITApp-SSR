import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import {
	createColumnSchedule,
	createUserSchedule,
	findEventById,
	getUsers,
	sendError,
} from "~utils/helpers";
import {
	missingEventId,
	unableToLocateEvent,
	unableToLocateMembers,
} from "~messages/errors";

/**
 * Retrieves a single event for scheduling form.
 *
 * @function getEventForScheduling
 * @returns {object} -schedule: { columns, event, users })
 * @throws {string}
 */
const getEventForScheduling = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingEventId;

		const event = await findEventById(_id);
		if (!event) throw unableToLocateEvent;

		const members = await getUsers({
			match: { role: { $eq: "employee" }, status: "active" },
			project: { firstName: 1, lastName: 1 },
		});
		/* istanbul ignore next */
		if (isEmpty(members)) throw unableToLocateMembers;

		res.status(200).json({
			schedule: {
				columns: createColumnSchedule({ event, members }),
				event,
				users: createUserSchedule({ event, members }),
			},
		});
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getEventForScheduling));
