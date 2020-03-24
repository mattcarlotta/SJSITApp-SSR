import withMiddleware from "~middlewares";
import { localLogin } from "~services/strategies";

/**
 * Allows a user to log in to the application.
 *
 * @function signin
 * @returns {object}
 */
const signin = (req, res) => res.status(200).send(req.session.user);

export default withMiddleware(localLogin(signin));
