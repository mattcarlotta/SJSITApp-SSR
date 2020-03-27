import { setServerMessage } from "~actions/Messages";
import { accessDenied } from "~messages/errors";
import toast from "~components/Body/Toast";
import Redirect from "~utils/redirect";

/**
 * Helper function to handle authentication.
 *
 * @async
 * @function checkAuthentication
 * @param {boolean} condition - primary conditional boolean to redirect user
 * @param {object} ctx - server-side context object
 * @param {function} getInitialProps - a Component's getInitialProps function
 * @function dispatch - dispatches a setServerMessage error message
 * @function toast - emits a toast notification
 * @function Redirect - redirects the user client/server side
 * @function getInitialProps - executes a Components getInitialProps if included
 * @returns {array}
 */
const checkAuthentication = async ({ condition, ctx, getInitialProps }) => {
	const {
		store: { dispatch },
		res,
	} = ctx;

	if (condition) {
		Redirect(res);
		dispatch(setServerMessage({ message: accessDenied }));
		toast({ type: "error", message: accessDenied });
	}

	if (getInitialProps) await getInitialProps(ctx);
};

export default checkAuthentication;
