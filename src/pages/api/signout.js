import withMiddleware from "~middlewares";

/**
 * Allows a user to log out of the application (removes cookie).
 *
 * @function signout
 * @returns {string}
 */
const signout = (req, res) => {
	req.session.destroy();

	res.clearCookie("SJSITApp", { path: "/" }).status(200).send("Session ended.");
};

export default withMiddleware(signout);
