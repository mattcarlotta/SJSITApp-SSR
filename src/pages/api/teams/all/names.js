import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Team } from "~models";

/**
 * Retrieves all teams names.
 *
 * @function getAllTeamNames
 * @returns {object} - names
 * @throws {string}
 */
const getAllTeamNames = async (_, res) => {
	const teams = await Team.aggregate([
		{ $group: { _id: null, names: { $addToSet: "$team" } } },
		{ $unwind: "$names" },
		{ $sort: { names: 1 } },
		{ $group: { _id: null, names: { $push: "$names" } } },
		{ $project: { _id: 0, names: 1 } },
	]);

	res.status(200).json({ names: teams[0].names });
};

export default withMiddleware(requireStaffRole(getAllTeamNames));
