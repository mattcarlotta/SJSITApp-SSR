import * as types from "~types";

export const initialState = {
	data: [],
	editForm: {},
	events: [],
	isLoading: true,
	totalDocs: 0,
	viewForm: {},
};

/**
 * @function formReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - forms state.
 */
const formReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.FORMS_EDIT:
		case types.FORMS_FETCH:
		case types.FORMS_FETCH_AP:
		case types.FORMS_RESET_AP:
			return initialState;
		case types.FORMS_SET: {
			return {
				...state,
				data: payload.forms,
				totalDocs: payload.totalDocs,
				isLoading: false,
			};
		}
		case types.FORMS_SET_AP: {
			return {
				...state,
				viewForm: payload.form,
				events: payload.events,
			};
		}
		case types.FORMS_SET_EDIT: {
			return { ...state, editForm: payload };
		}
		default: {
			return state;
		}
	}
};

export default formReducer;
