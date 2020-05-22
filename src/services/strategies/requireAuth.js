import { badCredentials, invalidStatus } from "~messages/errors";
import { parseSession, sendError } from "~utils/helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is logged into a session.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	try {
		const _id = parseSession(req);
		if (!_id) throw String(badCredentials);

		const existingUser = await User.findOne({ _id });
		if (!existingUser) throw String(badCredentials);
		if (existingUser.status === "suspended") throw String(invalidStatus);

		return next(req, res);
	} catch (error) {
		return sendError(error, 403, res);
	}
};
