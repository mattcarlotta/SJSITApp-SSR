import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Token } from "~models";
import { sendError } from "~utils/helpers";
import { invalidDeleteTokenRequest } from "~messages/errors";

/**
 * Deletes an token (authorization key).
 *
 * @function deleteToken
 * @returns {string} - message
 * @throws {string}
 */
const deleteToken = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) throw invalidDeleteTokenRequest;

		const token = await Token.findOne({ _id: id });
		if (!token) throw invalidDeleteTokenRequest;

		const { _id } = token;
		await Token.deleteOne({ _id });

		res
			.status(200)
			.json({ message: "Successfully deleted the authorization key." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteToken));
