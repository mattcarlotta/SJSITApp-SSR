import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";

/**
 * Allows a user to view requested page in application.
 *
 * @function isValidMember
 * @returns {object}
 */
const isValidMember = async (_, res) => {
	res.status(200).end();
};

export default withMiddleware(requireAuth(isValidMember));
