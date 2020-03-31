import Router from "next/router";

/**
 * Helper function to redirect a user client-side or server-side.
 *
 * @function redirect
 * @param {object} res - an API response.
 * @returns {string} - a parsed message string from res.data.message.
 */
function redirect(res) {
	if (res) {
		res.writeHead(302, {
			Location: "/employee/login",
			"Content-Type": "text/html; charset=utf-8",
		});
		res.end();
	} else {
		Router.push("/employee/login");
	}
}

/**
 * Helper function to redirect to a user client-side or server-side.
 *
 * @function redirectTo
 * @param {object} res - an API response.
 * @param {string} Location - URL location.
 * @returns {string} - a parsed message string from res.data.message.
 */
export function redirectTo(res, Location) {
	if (res) {
		res.writeHead(302, { Location });
		res.end();
	} else {
		Router.push(Location);
	}
}

export default redirect;
