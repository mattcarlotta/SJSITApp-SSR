import * as types from "~types";

export const initialState = {
	message: "",
	show: false,
	type: "",
};

/**
 * @function serverMessageReducer
 * @param {object} state - an object containing error or server messages.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - messages state.
 */
const serverMessageReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.MESSAGE_HIDE: {
			return { ...state, show: false };
		}
		case types.MESSAGE_RESET: {
			return { ...state, message: "", type: "" };
		}
		case types.MESSAGE_SET: {
			return { message: payload.message, show: true, type: payload.type };
		}
		default: {
			return state;
		}
	}
};

export default serverMessageReducer;
