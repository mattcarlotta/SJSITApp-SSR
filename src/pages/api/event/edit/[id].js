import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { findEventById, sendError } from "~utils/helpers";
import { missingEventId, unableToLocateEvent } from "~messages/errors";

/**
 * Retrieves a single event for editing/viewing.
 *
 * @function getEventForViewing
 * @returns {object} - event
 * @throws {string}
 */
const getEventForViewing = async (req, res) => {
	try {
		const { id: _id } = req.query;
		if (!_id) throw missingEventId;

		const existingEvent = await findEventById(_id);
		if (!existingEvent) throw unableToLocateEvent;

		res.status(200).json({ event: existingEvent });
	} catch (err) {
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getEventForViewing));
