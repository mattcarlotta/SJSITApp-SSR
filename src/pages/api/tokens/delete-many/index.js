import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Token } from "~models";
import { sendError } from "~utils/helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many tokens.
 *
 * @function deleteManyTokens
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyTokens = async (req, res) => {
	try {
		const { ids } = req.body;
		if (isEmpty(ids)) throw missingIds;

		await Token.deleteMany({ _id: { $in: ids } });

		res
			.status(200)
			.json({ message: "Successfully deleted the authorization keys." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteManyTokens));
