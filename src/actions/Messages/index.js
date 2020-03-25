import * as types from "~types";

/**
 * Resets the server message.
 *
 * @function resetServerMessage
 * @returns {object}
 */
export const resetServerMessage = () => ({
	type: types.MESSAGE_RESET,
});

/**
 * Sets a server message by type.
 *
 * @function resetServerMessage
 * @returns {object} - payload contains a string message and type: "success", "info", "warning", or "error".
 */
export const setServerMessage = ({ message }) => ({
	type: types.MESSAGE_SET,
	payload: { message },
});
