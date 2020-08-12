import { HYDRATE } from "next-redux-wrapper";
import * as types from "~types";

export const initialState = {
	id: "",
	avatar: "",
	email: "",
	firstName: "",
	lastName: "",
	role: "",
	isCollapsed: false,
};

/**
 * @function authReducer
 * @param {object} state - an object containing current user session state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - user session state.
 */
const authReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case HYDRATE:
			if (state.role && !payload.auth.role) delete payload.auth;

			return { ...state, ...payload.auth };
		case types.USER_SET_SIDEBAR_STATE: {
			return { ...state, isCollapsed: !state.isCollapsed };
		}
		case types.USER_UPDATE:
		case types.USER_SET_AVATAR:
		case types.USER_SIGNIN: {
			return { ...state, ...payload };
		}
		case types.USER_SIGNOUT: {
			return { ...initialState, role: "guest" };
		}
		default: {
			return state;
		}
	}
};

export default authReducer;
