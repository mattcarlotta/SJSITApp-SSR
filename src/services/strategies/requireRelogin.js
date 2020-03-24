import { parseSession, clearSession } from "~utils/helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	const _id = parseSession(req);
	if (!_id) return clearSession(req, res, 200);

	const existingUser = await User.findOne({ _id });
	if (!existingUser || existingUser.status === "suspended")
		return clearSession(req, res, 200);

	req.user = existingUser;

	next(req, res);
};
