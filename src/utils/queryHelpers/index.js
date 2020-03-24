import qs from "qs";

/**
 * Stringifies an object of table filter options.
 *
 * @function stringifyQuery
 * @param {object} query
 * @returns {string}
 */
export const stringifyQuery = query => qs.stringify(query, { skipNulls: true });

/**
 * Parses a stringified query to object
 *
 * @function parseQuery
 * @returns {object} - A redux action to display a server message by type.
 */
export const parseQuery = query => {
	const queries = qs.parse(query, {
		ignoreQueryPrefix: true,
	});

	/* istanbul ignore next */
	return {
		...queries,
		page: parseInt(queries.page || 1, 10),
	};
};

/**
 * Utilizes the functions above to parse and strinify a query.
 *
 * @function setQuery
 * @returns {object}
 */
export const setQuery = query => {
	const queries = parseQuery(query);
	const queryString = stringifyQuery(queries);

	return { queries, queryString };
};
