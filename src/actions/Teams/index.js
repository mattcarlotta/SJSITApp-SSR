import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Fetches all team names for events.
 *
 * @function fetchTeamNames
 * @returns {object}
 */
export const fetchTeamNames = () => ({
	type: types.TEAMS_FETCH_NAMES,
});

/**
 * Sets team names for event/ap form/table filtering.
 *
 * @function setTeamNames
 * @param {array} data - contains team names data ([teamnames]).
 * @returns {object}
 */
export const setTeamNames = data => ({
	type: types.TEAMS_SET_NAMES,
	payload: !isEmpty(data) ? data : [],
});
