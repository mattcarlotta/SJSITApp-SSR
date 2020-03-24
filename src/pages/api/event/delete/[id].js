import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { findEventById, sendError } from "~utils/helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";

/**
 * Deletes an event.
 *
 * @function deleteEvent
 * @returns {string} - message
 * @throws {string}
 */
const deleteEvent = async (req, res) => {
	try {
		const { id: _id } = req.params;
		if (!_id) throw missingEventId;

		const existingEvent = await findEventById(_id);
		if (!existingEvent) throw unableToLocateEvent;

		await existingEvent.delete();

		res.status(200).json({ message: "Successfully deleted the event." });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(deleteEvent));
