import { accessDenied } from "~messages/errors";
import Redirect from "~utils/redirect";
import dispatchError from "~utils/dispatchError";

/**
 * Helper function to handle authentication.
 *
 * @async
 * @function checkAuthentication
 * @param {boolean} condition - primary conditional boolean to redirect user
 * @param {object} ctx - server-side context object
 * @param {function} getInitialProps - a Component's getInitialProps function
 * @function dispatchError - dispatches a setServerMessage error message and a toast notification
 * @function Redirect - redirects the user client/server side
 * @function getInitialProps - executes a Components getInitialProps if included
 */
const checkAuthentication = async ({ condition, ctx, getInitialProps }) => {
	const {
		store: { dispatch },
		res,
	} = ctx;

	if (condition) {
		Redirect(res);
		dispatchError({ dispatch, message: accessDenied });
		return {};
	}

	if (getInitialProps) await getInitialProps(ctx);
};

export default checkAuthentication;
