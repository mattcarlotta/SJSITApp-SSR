import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Form } from "~models";
import { sendError } from "~utils/helpers";
import { missingFormId, unableToLocateForm } from "~messages/errors";

/**
 * Retrieves a single form for editing/viewing.
 *
 * @function getFormForViewing
 * @returns {object} - form
 * @throws {string}
 */
const getFormForViewing = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingFormId;

		const existingForm = await Form.findOne({ _id }, { __v: 0 });
		if (!existingForm) throw unableToLocateForm;

		res.status(200).json({ form: existingForm });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getFormForViewing));
