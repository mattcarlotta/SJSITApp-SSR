import { parseSession, clearSession } from "~utils/helpers";
import { User } from "~models";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res, resolve) => {
	try {
		const _id = parseSession(req);
		if (!_id) throw String("No previous session detected.");

		const existingUser = await User.findOne(
			{ _id },
			{ _v: 0, password: 0, token: 0 },
		);
		if (!existingUser || existingUser.status === "suspended")
			throw String("Not a valid user.");

		req.user = {
			id: existingUser._id,
			avatar: existingUser.avatar,
			email: existingUser.email,
			firstName: existingUser.firstName,
			lastName: existingUser.lastName,
			role: existingUser.role,
		};

		return resolve(next(req, res));
	} catch (err) {
		return resolve(clearSession(req, res, 200));
	}
};
