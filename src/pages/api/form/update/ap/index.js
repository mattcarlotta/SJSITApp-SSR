import withMiddleware from "~middlewares";
import { requireAuth } from "~services/strategies";
import { Event, Form } from "~models";
import { sendError } from "~utils/helpers";
import { unableToLocateForm, unableToUpdateApForm } from "~messages/errors";

/**
 * Updates an event's 'eventResponses'.
 *
 * @function updateApForm
 * @returns {string} - message
 * @throws {string}
 */
const updateApForm = async (req, res) => {
	try {
		const { _id, responses } = req.body;
		if (!_id || !responses) throw unableToUpdateApForm;

		const formExists = await Form.findOne({ _id });
		if (!formExists) throw unableToLocateForm;

		const { id: userId } = req.session.user;

		await Event.bulkWrite(
			responses.map(response => {
				const { id: eventId, value, notes, updateEvent } = response;

				const filter = updateEvent
					? {
							_id: eventId,
							"employeeResponses._id": userId,
					  }
					: {
							_id: eventId,
					  };

				const update = updateEvent
					? {
							$set: {
								"employeeResponses.$.response": value,
								"employeeResponses.$.notes": notes,
							},
					  }
					: {
							$push: {
								employeeResponses: {
									_id: userId,
									response: value,
									notes,
								},
							},
					  };

				return {
					updateOne: {
						filter,
						update,
					},
				};
			}),
		);

		res
			.status(201)
			.json({ message: "Successfully added your responses to the A/P form!" });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireAuth(updateApForm));
