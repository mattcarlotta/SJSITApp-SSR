import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Team } from "~models";
import { createUniqueName, sendError } from "~utils/helpers";
import { teamAlreadyExists, unableToCreateTeam } from "~messages/errors";

/**
 * Creates a new team.
 *
 * @function createTeam
 * @returns {string} - message
 * @throws {string}
 */
const createTeam = async (req, res) => {
	try {
		const { league, team } = req.body;
		if (!league || !team) throw unableToCreateTeam;

		const name = createUniqueName(team);
		const existingTeam = await Team.findOne({ name });
		if (existingTeam) throw teamAlreadyExists;

		await Team.create({
			name,
			league,
			team,
		});

		res.status(201).json({
			message: `Successfully added the ${team} to the ${league}.`,
		});
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(createTeam));
