import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { getUsers, sendError } from "~utils/helpers";
import { unableToLocateMembers } from "~messages/errors";

/**
 * Retrieves all members names.
 *
 * @function getAllMemberNames
 * @returns {object} - members
 * @throws {string}
 */
const getAllMemberNames = async (_, res) => {
	try {
		const members = await getUsers({
			match: {
				role: { $eq: "employee" },
				status: "active",
			},
			project: {
				id: 1,
				email: {
					$concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"],
				},
			},
		});
		/* istanbul ignore next */
		if (isEmpty(members)) throw unableToLocateMembers;

		res.status(200).json({ members });
	} catch (err) {
		/* istanbul ignore next */
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAllMemberNames));
