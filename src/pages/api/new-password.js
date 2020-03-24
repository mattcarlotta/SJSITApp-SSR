import withMiddleware from "~middlewares";
import { newPassword } from "~services/strategies";
import { passwordResetSuccess } from "messages/success";

/**
 * Allows a user to update their password with an authorization key.
 *
 * @function updatePassword
 * @returns {string} - message
 */
const updatePassword = (req, res) => {
	res.status(200).json({ message: passwordResetSuccess(req.user) });
};

export default withMiddleware(newPassword(updatePassword));
