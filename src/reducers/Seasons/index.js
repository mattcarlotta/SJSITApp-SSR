import * as types from "~types";

export const initialState = {
	data: [],
	editSeason: {},
	ids: [],
	isLoading: true,
	totalDocs: 0,
};

/**
 * @function seasonReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - seasons state.
 */
const seasonReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.SEASONS_EDIT:
		case types.SEASONS_FETCH:
		case types.SEASONS_FETCH_IDS: {
			return initialState;
		}
		case types.SEASONS_SET: {
			return {
				...state,
				data: payload.seasons,
				totalDocs: payload.totalDocs,
				isLoading: false,
			};
		}
		case types.SEASONS_SET_IDS: {
			return { ...state, ids: payload.seasonIds };
		}
		case types.SEASONS_SET_EDIT: {
			return { ...state, editSeason: payload.season };
		}
		default: {
			return state;
		}
	}
};

export default seasonReducer;
