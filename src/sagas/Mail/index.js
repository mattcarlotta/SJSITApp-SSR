import Router from "next/router";
import { all, put, call, select, takeLatest } from "redux-saga/effects";
import app from "~utils/axiosConfig";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as actions from "~actions/Mail";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import setError from "~utils/setError";
import toast from "~components/Body/Toast";
import * as types from "~types";

/**
 * Attempts to send a new email to admin or staff.
 *
 * @generator
 * @function contactUs
 * @param {object} props -contains mail data ([sendTo, message, subject]).
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - Navigates a user to a route.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* contactUs({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "mail/contact", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.push, "/employee/dashboard");
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to create a new email.
 *
 * @generator
 * @function createMail
 * @param {object} props -contains mail data ([id, sendTo, sendFrom, sendDate, message, subject]).
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - Navigates a user to a route.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createMail({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "mail/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.push, "/employee/mail/viewall?page=1");
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to delete an email.
 *
 * @generator
 * @function deleteMail
 * @param {obect} mailId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to fresh mail data.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteMail({ mailId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `mail/delete/${mailId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchMails());
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to delete many emails.
 *
 * @generator
 * @function deleteManyMails
 * @param {obect} ids
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to fresh mail data.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteManyMails({ ids }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `mails/delete-many`, { data: { ids } });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchMails());
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to get all mails.
 *
 * @generator
 * @function fetchMails
 * @yields {string} - A stringified location.search query.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set mail data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMails() {
	try {
		const query = yield select(selectQuery);

		const res = yield call(app.get, `mail/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setMails(data));
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to resend form emails.
 *
 * @generator
 * @function resendMail
 * @param {object} mailId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to fresh mail data.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* resendMail({ mailId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, `mail/resend/${mailId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "info", message });

		yield put(actions.fetchMails());
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to update an existing mail.
 *
 * @generator
 * @function updateMail
 * @param {object} props - props contain mailID and mail fields.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - Navigates a user to a previous URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMail({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "mail/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.back);
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function mailsSagas
 * @yields {watchers}
 */
export default function* mailsSagas() {
	yield all([
		takeLatest(types.MAIL_CONTACT_US, contactUs),
		takeLatest(types.MAIL_CREATE, createMail),
		takeLatest(types.MAIL_DELETE, deleteMail),
		takeLatest(types.MAIL_DELETE_MANY, deleteManyMails),
		takeLatest(types.MAIL_FETCH, fetchMails),
		takeLatest(types.MAIL_RESEND, resendMail),
		takeLatest(types.MAIL_UPDATE_EDIT, updateMail),
	]);
}
