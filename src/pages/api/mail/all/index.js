import get from "lodash.get";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Mail } from "~models";
import { generateFilters, sendError } from "~utils/helpers";

/**
 * Retrieves all events for ViewEvents page.
 *
 * @function getAllMail
 * @returns {object} - mail and total mail documents
 * @throws {string}
 */
const getAllMail = async (req, res) => {
	try {
		const { page } = req.query;

		const filters = generateFilters(req.query);

		const results = await Mail.paginate(
			{ ...filters },
			{
				sort: { sendDate: -1 },
				page,
				limit: 10,
				select: "-notes -__v",
			},
		);

		const mail = get(results, ["docs"]);
		const totalDocs = get(results, ["totalDocs"]);

		res.status(200).json({ mail, totalDocs });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAllMail));
