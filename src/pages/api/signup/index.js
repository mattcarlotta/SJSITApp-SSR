import withMiddleware from "~middlewares";
import { localSignup } from "~services/strategies";
import { thanksForReg } from "~messages/success";

/**
 * Creates a new user.
 *
 * @function createUser
 * @returns {string} - message
 */
const createUser = (req, res) => {
	res.status(201).json(thanksForReg(req.user.firstName, req.user.lastName));
};

export default withMiddleware(localSignup(createUser));
