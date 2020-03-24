import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { sendError } from "~utils/helpers";

/**
 * Retrieves a single team for viewing/editing.
 *
 * @function getTeamForViewing
 * @returns {string} - message
 */
const getTeamForViewing = (_, res) => sendError("Route not setup.", 404, res);

export default withMiddleware(requireStaffRole(getTeamForViewing));
