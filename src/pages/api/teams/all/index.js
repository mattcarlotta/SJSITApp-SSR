import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { sendError } from "~utils/helpers";

/**
 * Retrieves all teams names.
 *
 * @function getAllTeams
 * @returns {string} - message
 */
const getAllTeams = (_, res) => sendError("Route not setup.", 404, res);

export default withMiddleware(requireStaffRole(getAllTeams));
