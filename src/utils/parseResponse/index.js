import get from "lodash.get";

/**
 * Helper function to parse a cookie from an API request.
 *
 * @function parseCookie
 * @param {obj} req - an API request.
 * @returns {obj} - a object with a cookie from req.headers.cookie.
 */
export function parseCookie(req) {
	const cookie = get(req, ["headers", "cookie"]);
	return cookie ? { headers: { cookie } } : undefined;
}

/**
 * Helper function to parse a message from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {string} - a parsed message string from res.data.message.
 */
export function parseMessage(res) {
	const message = get(res, ["data", "message"]);
	return message;
}

/**
 * Helper function to parse data from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {object} - a parsed data object from res.data.
 */
export function parseData(res) {
	const data = get(res, ["data"]);
	return data;
}
