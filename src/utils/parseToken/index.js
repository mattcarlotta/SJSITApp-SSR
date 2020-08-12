import qs from "qs";

/**
 * Helper function to parse a token from a search string.
 *
 * @function
 * @param {string} search - a URL string.
 * @returns {string} - a parsed token string from search.
 */
const parseToken = search => {
	const { token } = qs.parse(search, {
		ignoreQueryPrefix: true,
	});

	return token;
};

export default parseToken;
