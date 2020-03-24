/**
 * Creates a static referenceable function to select the current query from redux state.
 *
 * @function selectQuery
 * @returns {string}
 */
export const selectQuery = state => state.router.location.search;
