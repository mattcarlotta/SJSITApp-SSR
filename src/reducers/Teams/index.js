import * as types from "~types";

export const initialState = {
	data: [],
};

/**
 * @function teamsReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - seasons state.
 */
const teamsReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.TEAMS_FETCH_NAMES: {
			return initialState;
		}
		case types.TEAMS_SET_NAMES: {
			return {
				...state,
				data: payload.names,
			};
		}
		default:
			return state;
	}
};

export default teamsReducer;
