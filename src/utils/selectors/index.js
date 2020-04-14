/* istanbul ignore file */

/**
 * Creates a static referenceable function to select the current query from window.
 *
 * @function selectQuery
 * @returns {string}
 */
export const selectQuery = () => window.location.search;
