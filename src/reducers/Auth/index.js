import * as types from "~types";

export const initialState = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
	role: "",
};

/**
 * @function authReducer
 * @param {object} state - an object containing current user session state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - user session state.
 */
const authReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.USER_SIGNIN: {
			return { ...state, ...payload };
		}
		case types.USER_SIGNOUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default authReducer;
