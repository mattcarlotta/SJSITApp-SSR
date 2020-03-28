import get from "lodash.get";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Form } from "~models";
import { generateFilters, sendError } from "~utils/helpers";

/**
 * Retrieves all forms for ViewForms page.
 *
 * @function getAllForms
 * @returns {object} - sorted forms and total form documents
 * @throws {string}
 */
const getAllForms = async (req, res) => {
	try {
		const { page } = req.query;

		const filters = generateFilters(req.query);

		const results = await Form.paginate(
			{ ...filters },
			{
				sort: { startMonth: -1 },
				page,
				limit: 10,
				select: "-notes -__v",
			},
		);

		const forms = get(results, ["docs"]);
		const totalDocs = get(results, ["totalDocs"]);

		res.status(200).json({ forms, totalDocs });
	} catch (err) {
		sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAllForms));
