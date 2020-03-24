import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";

/**
 * Allows a staff member to view requested page in application.
 *
 * @function isValidStaffMember
 * @returns {object}
 */
const isValidStaffMember = (_, res) => res.status(200);

export default withMiddleware(requireStaffRole(isValidStaffMember));
