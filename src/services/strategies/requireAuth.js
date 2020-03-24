import { badCredentials } from "~messages/errors";
import { parseSession, clearSession, sendError } from "~utils/helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is logged into a session.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	const _id = parseSession(req);
	if (!_id) return clearSession(req, res, 404, badCredentials);

	const existingUser = await User.findOne({ _id });
	if (!existingUser || existingUser.status === "suspended")
		return sendError(badCredentials, 404, res);

	next(req, res);
};
