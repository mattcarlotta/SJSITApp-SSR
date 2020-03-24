import * as types from "~types";

export const initialState = {
	data: [],
	editMail: {},
	isLoading: true,
	totalDocs: 0,
};

/**
 * @function mailReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - seasons state.
 */
const mailReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.MAIL_EDIT:
		case types.MAIL_FETCH: {
			return initialState;
		}
		case types.MAIL_SET: {
			return {
				...state,
				data: payload.mail,
				totalDocs: payload.totalDocs,
				isLoading: false,
			};
		}
		case types.MAIL_SET_EDIT: {
			return { ...state, editMail: payload };
		}
		default: {
			return state;
		}
	}
};

export default mailReducer;
