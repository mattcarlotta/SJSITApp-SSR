import Router from "next/router";
import { all, put, call, select, takeLatest } from "redux-saga/effects";
import app from "~utils/axiosConfig";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as actions from "~actions/Events";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import setError from "~utils/setError";
import toast from "~components/Body/Toast";
import * as types from "~types";

/**
 * Attempts to create a new event.
 *
 * @generator
 * @function createEvent
 * @param {object} props - props contain league, eventType, location, timeSlots, uniform, start/end dates and times, and seasonId.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - Navigates user to route.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createEvent({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "event/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.push, "/employee/events/viewall?page=1");
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to delete an event.
 *
 * @generator
 * @function deleteEvent
 * @param {object} eventId
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to refresh events data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteEvent({ eventId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `event/delete/${eventId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchEvents());
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to delete many events.
 *
 * @generator
 * @function deleteManyEvents
 * @param {object} ids
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to refresh events data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteManyEvents({ ids }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `events/delete-many`, { data: { ids } });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchEvents());
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to get event for editing.
 *
 * @generator
 * @function fetchEvent
 * @param {string} eventId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set event data for editing to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEvent({ eventId }) {
	try {
		yield put(resetServerMessage());

		let res = yield call(app.get, `event/edit/${eventId}`);
		const events = yield call(parseData, res);

		res = yield call(app.get, "seasons/all/ids");
		const seasons = yield call(parseData, res);

		res = yield call(app.get, "teams/all/names");
		const teams = yield call(parseData, res);

		yield put(
			actions.setEventToEdit({
				...events.event,
				seasonIds: seasons.seasonIds,
				teams: teams.names,
			}),
		);
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to get all events.
 *
 * @generator
 * @function fetchEvents
 * @yields {string} - A stringified location.search query.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set events data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEvents() {
	try {
		const query = yield select(selectQuery);
		const res = yield call(app.get, `events/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setEvents(data));
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to get all events within a month for ViewSchedule page.
 *
 * @generator
 * @function fetchScheduleEvents
 * @param {object} params - selectedDate and games (all or my)
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set schedule data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchScheduleEvents({ params }) {
	try {
		const res = yield call(app.get, "events/schedule", { params });
		const data = yield call(parseData, res);

		yield put(actions.setScheduleEvents(data));
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to resend form emails.
 *
 * @generator
 * @function resendEventEmails
 * @param {object} eventId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to refresh events data.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* resendEventEmails({ eventId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, `event/resend-email/${eventId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "info", message });

		yield put(actions.fetchEvents());
	} catch (e) {
		yield call(setError, e.toString());
	}
}

/**
 * Attempts to update an existing event.
 *
 * @generator
 * @function updateEvent
 * @param {object} props - props contain league, eventType, location, timeSlots, uniform, start/end dates and times, and seasonId.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - Navigates user to a previous URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateEvent({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "event/update", { ...props });
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
 * Attempts to update an existing event schedule.
 *
 * @generator
 * @function updateEventSchedule
 * @param {object} props - contains event schedule data ([{ callTime, userIds }]).
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - Navigates user to a previous URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateEventSchedule({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "event/update/schedule", { ...props });
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
 * @function eventsSagas
 * @yields {watchers}
 */
export default function* eventsSagas() {
	yield all([
		takeLatest(types.EVENTS_CREATE, createEvent),
		takeLatest(types.EVENTS_DELETE, deleteEvent),
		takeLatest(types.EVENTS_DELETE_MANY, deleteManyEvents),
		takeLatest(types.EVENTS_EDIT, fetchEvent),
		takeLatest(types.EVENTS_FETCH, fetchEvents),
		takeLatest(types.EVENTS_FETCH_SCHEDULE_EVENTS, fetchScheduleEvents),
		takeLatest(types.EVENTS_RESEND_MAIL, resendEventEmails),
		takeLatest(types.EVENTS_UPDATE, updateEvent),
		takeLatest(types.EVENTS_UPDATE_SCHEDULE, updateEventSchedule),
	]);
}
