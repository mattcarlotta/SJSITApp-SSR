import Router from "next/router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "~utils";
import { signin, signout } from "~actions/Auth";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import { parseCookie, parseData, parseMessage } from "~utils/parseResponse";
import Redirect from "~utils/redirect";
import toast from "~components/Body/Toast";
import * as types from "~types";

/**
 * Removes the current user from a express and redux session.
 *
 * @generator
 * @function signoutUserSession
 * @yields {object} - A redux action to remove the current user from state.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signoutUserSession() {
	try {
		yield call(app.get, "signout");

		yield put(signout());

		yield call(Router.push, "/employee/login");
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to automatically sign user in via a session.
 *
 * @generator
 * @function authenticateUser
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* authenticateUser({ req }) {
	try {
		const headers = yield call(parseCookie, req);
		const res = yield call(app.get, "signedin", headers);
		const data = yield call(parseData, res);

		yield put(signin(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Redirects user if not signed in as at least a member.
 *
 * @generator
 * @function requiresBasicCreds
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* requiresBasicCreds({ req, res }) {
	try {
		const headers = yield call(parseCookie, req);
		yield call(app.get, "is-member", headers);
	} catch (e) {
		yield call(Redirect, res);
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Redirects user if not signed in as a staff member.
 *
 * @generator
 * @function requiresStaffCreds
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* requiresStaffCreds({ req, res }) {
	try {
		const headers = yield call(parseCookie, req);
		yield call(app.get, "is-staff-member", headers);
	} catch (e) {
		yield call(Redirect, res);
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to create a reset password request.
 *
 * @generator
 * @function resetPassword
 * @param {object} props - props just contain an email field.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to sign the user of any sessions.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* resetPassword({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "reset-password", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield call(signoutUserSession);
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to sign user in to a new session.
 *
 * @generator
 * @function signinUser
 * @param {object} props - contains user credentials (email and password).
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} -  A redux action to set the current user to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signinUser({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "signin", { ...props });
		const data = yield call(parseData, res);

		yield put(signin(data));
		yield call(Router.push, "/employee/dashboard");
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to sign up a new user.
 *
 * @generator
 * @function signupUser
 * @param {object} props - props contain a token, an email, first/last name, and a password.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signupUser({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "signup", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield call(Router.push, "/employee/login");
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to create a new user password.
 *
 * @generator
 * @function updateUserPassword
 * @param {object} props - props contain a token and (new) password fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to sign the user out of any sessions.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateUserPassword({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "new-password", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield call(signoutUserSession);
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function authSagas
 * @yields {watchers}
 */
export default function* authSagas() {
	yield all([
		takeLatest(types.USER_SIGNIN_SESSION, authenticateUser),
		takeLatest(types.USER_REQUIRE_BASIC_CREDS, requiresBasicCreds),
		takeLatest(types.USER_REQUIRE_STAFF_CREDS, requiresStaffCreds),
		takeLatest(types.USER_PASSWORD_RESET, resetPassword),
		takeLatest(types.USER_SIGNIN_ATTEMPT, signinUser),
		takeLatest(types.USER_SIGNOUT_SESSION, signoutUserSession),
		takeLatest(types.USER_SIGNUP, signupUser),
		takeLatest(types.USER_PASSWORD_UPDATE, updateUserPassword),
	]);
}
