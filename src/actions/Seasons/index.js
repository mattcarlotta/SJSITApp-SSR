import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new season.
 *
 * @function createSeason
 * @param {object} props - props just contain an seasonId and season duration fields.
 * @returns {object}
 */
export const createSeason = props => ({
	type: types.SEASONS_CREATE,
	props,
});

/**
 * Deletes a new season.
 *
 * @function deleteSeason
 * @param {string} seasonId
 * @returns {object}
 */
export const deleteSeason = seasonId => ({
	type: types.SEASONS_DELETE,
	seasonId,
});

/**
 * Deletes many seasons.
 *
 * @function deleteManySeasons
 * @param {array} ids
 * @returns {object}
 */
export const deleteManySeasons = ids => ({
	type: types.SEASONS_DELETE_MANY,
	ids,
});

/**
 * Fetches a single season.
 *
 * @function fetchSeason
 * @param {string} seasonId
 * @returns {object}
 */
export const fetchSeason = seasonId => ({
	type: types.SEASONS_EDIT,
	seasonId,
});

/**
 * Fetches all seasons.
 *
 * @function fetchSeasons
 * @returns {object}
 */
export const fetchSeasons = () => ({
	type: types.SEASONS_FETCH,
});

/**
 * Fetches all seasons ids.
 *
 * @function fetchSeasonsIds
 * @returns {object}
 */
export const fetchSeasonsIds = () => ({
	type: types.SEASONS_FETCH_IDS,
});

/**
 * Sets seasons for ViewSeasons page to redux state
 *
 * @function setSeasons
 * @param {array} data - contains season data ([id, seasonId, members, startDate, endDate]).
 * @returns {object}
 */
export const setSeasons = data => ({
	type: types.SEASONS_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets any seasons ids for event/Ap form creating/editing to redux state
 *
 * @function setSeasonsIds
 * @param {array} data - contains season data ([id]).
 * @returns {object}
 */
export const setSeasonsIds = data => ({
	type: types.SEASONS_SET_IDS,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a single season to redux state for editing.
 *
 * @function setSeasonToEdit
 * @param {object} data - seasonId and season duration fields
 * @returns {object}
 */
export const setSeasonToEdit = data => ({
	type: types.SEASONS_SET_EDIT,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Updates a single season.
 *
 * @function updateSeason
 * @param {object} data - id, seasonId and season duration fields
 * @returns {object}
 */
export const updateSeason = props => ({
	type: types.SEASONS_UPDATE_EDIT,
	props,
});
