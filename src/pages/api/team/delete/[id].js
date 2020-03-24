import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Team } from "~models";
import { sendError } from "~utils/helpers";
import { missingTeamId, unableToDeleteTeam } from "~messages/errors";

/**
 * Deletes an event.
 *
 * @function deleteTeam
 * @returns {string} - message
 */
const deleteTeam = (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) throw missingTeamId;

    const existingTeam = await Team.findOne({ _id });
    if (!existingTeam) throw unableToDeleteTeam;

    await existingTeam.delete();

    res.status(200).json({ message: "Successfully deleted the team." });
  } catch (err) {
    return sendError(err, 400, res);
  }
}

export default withMiddleware(requireStaffRole(deleteTeam));
