import * as types from "~types";

export const initialState = {
	message: "",
};

/**
 * @function serverMessageReducer
 * @param {object} state - an object containing error or server messages.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - messages state.
 */
const serverMessageReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.MESSAGE_RESET: {
			return initialState;
		}
		case types.MESSAGE_SET: {
			return { ...state, message: payload.message };
		}
		default: {
			return state;
		}
	}
};

export default serverMessageReducer;
