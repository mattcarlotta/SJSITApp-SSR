import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { sendError } from "~utils/helpers";

/**
 * Updates a single team's details.
 *
 * @function updateTeam
 * @returns {string} - message
 */
const updateTeam = (_, res) => sendError("Route not setup.", 404, res);

export default withMiddleware(requireStaffRole(updateTeam));
