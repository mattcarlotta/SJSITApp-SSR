import withMiddleware from "~middlewares";
import { clearSession } from "~utils/helpers";

/**
 * Allows a user to log out of the application (removes cookie).
 *
 * @function signout
 * @returns {string}
 */
const signout = (req, res) => {
	clearSession(req, res, 200);
};

export default withMiddleware(signout);
