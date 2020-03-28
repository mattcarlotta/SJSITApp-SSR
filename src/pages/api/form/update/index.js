import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Form, Season } from "~models";
import { createDate, sendError } from "~utils/helpers";
import {
	formAlreadyExists,
	unableToLocateForm,
	unableToLocateSeason,
	unableToUpdateForm,
} from "~messages/errors";

/**
 * Updates an form's details.
 *
 * @function updateForm
 * @returns {string} - message
 * @throws {string}
 */
const updateForm = async (req, res) => {
	try {
		const {
			_id,
			expirationDate,
			enrollMonth,
			notes,
			seasonId,
			sendEmailNotificationsDate,
		} = req.body;

		if (!_id || !seasonId || !expirationDate || !enrollMonth)
			throw unableToUpdateForm;

		const seasonExists = await Season.findOne({ seasonId });
		if (!seasonExists) throw unableToLocateSeason;

		const formExists = await Form.findOne({ _id });
		if (!formExists) throw unableToLocateForm;

		const [startMonth, endMonth] = enrollMonth;
		const existingForms = await Form.find({
			_id: { $ne: formExists._id },
			startMonth: { $gte: startMonth },
			endMonth: { $lte: endMonth },
		});
		if (!isEmpty(existingForms)) throw formAlreadyExists;

		// const currentDay = getStartOfDay();
		const sendEmailsDate = createDate(sendEmailNotificationsDate).format();
		// const expiration = createDate(expirationDate).format();

		// if (expiration < currentDay) throw invalidExpirationDate;
		// if (sendEmailsDate < currentDay) throw invalidSendDate;

		const resendEmails = createDate(sendEmailsDate).isSame(
			createDate(formExists.sendEmailNotificationsDate),
			"day",
		);

		await formExists.updateOne({
			seasonId,
			startMonth,
			endMonth,
			expirationDate,
			notes,
			sendEmailNotificationsDate: sendEmailsDate,
			sentEmails: resendEmails,
		});

		res.status(201).json({ message: "Successfully updated the form!" });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(updateForm));
