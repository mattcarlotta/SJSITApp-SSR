import get from "lodash.get";
import withMiddleware from "~middlewares";
import { requireStaffRole } from "~services/strategies";
import { Token } from "~models";
import { generateFilters, sendError } from "~utils/helpers";

/**
 * Retrieves all tokens (authorization keys) for ViewAuthorization page.
 *
 * @function getAllTokens
 * @returns {object} - tokens and total token documents
 * @throws {string}
 */
const getAllTokens = async (req, res) => {
	try {
		const { email, page, role } = req.query;

		const filters = generateFilters(req.query);

		const emailFilter = email
			? { email: { $exists: email === "registered" } }
			: {};

		const roleFilter = role
			? { $regex: role, $options: "i" }
			: { $ne: "admin" };

		const results = await Token.paginate(
			{ ...filters, ...emailFilter, role: roleFilter },
			{
				sort: { expiration: -1 },
				page,
				limit: 10,
				select: "-__v",
			},
		);

		const tokens = get(results, ["docs"]);
		const totalDocs = get(results, ["totalDocs"]);

		res.status(200).json({ tokens, totalDocs });
	} catch (err) {
		/* istanbul ignore next */
		return sendError(err, 400, res);
	}
};

export default withMiddleware(requireStaffRole(getAllTokens));
