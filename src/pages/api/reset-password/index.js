import withMiddleware from "~middlewares";
import { resetToken } from "~services/strategies";
import { passwordResetToken } from "~messages/success";

/**
 * Emails a user a new authorization key to reset their password.
 *
 * @function emailResetToken
 * @returns {string} - message
 */
const sendEmailResetToken = (req, res) => {
	res.status(200).json(passwordResetToken(req.user));
};

export default withMiddleware(resetToken(sendEmailResetToken));
