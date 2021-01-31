import isEmpty from "lodash.isempty";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Form, Season } from "~models";
import { createDate, getStartOfDay, sendError } from "~utils/helpers";
import moment from "~utils/momentWithTZ";
import {
	formAlreadyExists,
	invalidExpirationDate,
	invalidSendEmailNoteDate,
	unableToCreateNewForm,
	unableToLocateSeason,
} from "~messages/errors";

/**
 * Creates a new form.
 *
 * @function createForm
 * @returns {string} - message
 * @throws {string}
 */
const createForm = async (req, res) => {
	try {
		const {
			expirationDate,
			enrollMonth,
			notes,
			sendEmailNotificationsDate,
			seasonId,
		} = req.body;

		if (!seasonId || !expirationDate || !enrollMonth)
			throw unableToCreateNewForm;

		const seasonExists = await Season.findOne({ seasonId });
		if (!seasonExists) throw unableToLocateSeason;

		const [startMonthDate, endMonthDate] = enrollMonth;
		const startMonth = moment(startMonthDate).startOf("day");
		const endMonth = moment(endMonthDate).endOf("day");

		const existingForms = await Form.find({
			startMonth: { $gte: startMonth },
			endMonth: { $lte: endMonth },
		});
		if (!isEmpty(existingForms)) throw formAlreadyExists;

		const sendEmailsDate = createDate(sendEmailNotificationsDate).format();
		const currentDay = getStartOfDay();

		if (expirationDate < currentDay) throw invalidExpirationDate;
		if (sendEmailsDate < currentDay) throw invalidSendEmailNoteDate;

		await Form.create({
			seasonId,
			startMonth,
			endMonth,
			expirationDate,
			notes,
			sendEmailNotificationsDate: sendEmailsDate,
		});

		res.status(201).json({ message: "Successfully created a new form!" });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(createForm));
