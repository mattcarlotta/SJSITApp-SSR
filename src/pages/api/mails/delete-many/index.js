import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail } from "~models";
import { sendError } from "~utils/helpers";
import { missingIds } from "~messages/errors";

/**
 * Deletes many events.
 *
 * @function deleteManyMails
 * @returns {string} - message
 * @throws {string}
 */
const deleteManyMails = async (req, res) => {
	try {
		const { ids } = req.body;
		if (isEmpty(ids)) throw missingIds;

		await Mail.deleteMany({ _id: { $in: ids } });

		res.status(200).json({ message: "Successfully deleted the mail." });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteManyMails));
