import { setServerMessage } from "~actions/Messages";
import toast from "~components/Body/Toast";

/**
 * Helper function to show server errors.
 *
 * @function dispatchError
 * @param {function} dispatch - redux dispatch function
 * @param {string} message - message to show
 * @function dispatch - dispatches a setServerMessage error message
 * @function toast - emits a toast notification
 */
const dispatchError = ({ dispatch, message }) => {
	dispatch(setServerMessage({ message }));
	toast({ type: "error", message });
};

export default dispatchError;
