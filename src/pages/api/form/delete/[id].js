import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Form } from "~models";
import { sendError } from "~utils/helpers";
import { missingFormId, unableToDeleteForm } from "~messages/errors";

/**
 * Deletes a form.
 *
 * @function deleteForm
 * @returns {string} - message
 * @throws {string}
 */
const deleteForm = async (req, res) => {
	try {
		const { id: _id } = req.params;
		if (!_id) throw missingFormId;

		const existingForm = await Form.findOne({ _id });
		if (!existingForm) throw unableToDeleteForm;

		await existingForm.delete();

		res.status(200).json({ message: "Successfully deleted the form." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteForm));
