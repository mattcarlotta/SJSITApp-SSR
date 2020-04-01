import Router from "next/router";
import { all, put, call, select, takeLatest } from "redux-saga/effects";
import { app } from "~utils";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as actions from "~actions/Forms";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import toast from "~components/Body/Toast";
import * as types from "~types";

/**
 * Attempts to create a new form.
 *
 * @generator
 * @function createForm
 * @param {object} props - props contain league, formType, location, timeSlots, uniform, start/end dates and times, and seasonId.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createForm({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "form/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.push, "/employee/forms/viewall?page=1");
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete a form.
 *
 * @generator
 * @function deleteForm
 * @param {object} formId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch forms data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteForm({ formId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `form/delete/${formId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchForms());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete many forms.
 *
 * @generator
 * @function deleteManyForms
 * @param {object} ids
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch forms data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteManyForms({ ids }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `forms/delete-many`, { data: { ids } });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchForms());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get all forms.
 *
 * @generator
 * @function fetchForms
 * @yields {string} - A stringified location.search query.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set forms data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchForms() {
	try {
		const query = yield select(selectQuery);

		const res = yield call(app.get, `forms/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setForms(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to resend form emails.
 *
 * @generator
 * @function resendFormEmails
 * @param {object} eventId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to refetch forms data.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* resendFormEmails({ formId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, `form/resend-email/${formId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "info", message });

		yield put(actions.fetchForms());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to update an existing form.
 *
 * @generator
 * @function updateForm
 * @param {object} props - contains form data ([_id, seasonId, startMonth, startDate, expirationDate]).
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to go back to a previous URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateForm({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "form/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.back);
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to update the a/p month form.
 *
 * @generator
 * @function updateFormAp
 * @param {object} props - contains form data ({_id, responses, notes}).
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateFormAp({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "form/update/ap", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.push, "/employee/dashboard");
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function formsSagas
 * @yields {watchers}
 */
export default function* formsSagas() {
	yield all([
		takeLatest(types.FORMS_CREATE, createForm),
		takeLatest(types.FORMS_DELETE, deleteForm),
		takeLatest(types.FORMS_DELETE_MANY, deleteManyForms),
		takeLatest(types.FORMS_FETCH, fetchForms),
		takeLatest(types.FORMS_RESEND_MAIL, resendFormEmails),
		takeLatest(types.FORMS_UPDATE, updateForm),
		takeLatest(types.FORMS_UPDATE_AP, updateFormAp),
	]);
}
