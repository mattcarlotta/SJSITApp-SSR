import { badCredentials } from "~messages/errors";
import { parseSession, clearSession } from "~utils/helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is logged into a session.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	const user = parseSession(req);
	if (!user) return clearSession(res, 404, badCredentials);

	const existingUser = await User.findOne({ _id: user.id, email: user.email });
	if (!existingUser || existingUser.status === "suspended")
		return sendError(badCredentials, 404, res);

	next(req, res);
};
