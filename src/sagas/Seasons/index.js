import Router from "next/router";
import { all, put, call, select, takeLatest } from "redux-saga/effects";
import { app } from "~utils";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as actions from "~actions/Seasons";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import toast from "~components/Body/Toast";
import * as types from "~types";

/**
 * Attempts to create a new season.
 *
 * @generator
 * @function createSeason
 * @param {object} props - props contain seasonID and season fields.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createSeason({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "season/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield call(Router.push, "/employee/seasons/viewall?page=1");
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete a season (and any events forms attached to it).
 *
 * @generator
 * @function deleteSeason
 * @param {object} seasonId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to refetch seasons.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteSeason({ seasonId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `season/delete/${seasonId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchSeasons());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete many seasons (and any events forms attached to it).
 *
 * @generator
 * @function deleteManySeasons
 * @param {object} ids
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to refetch seasons.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteManySeasons({ ids }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `seasons/delete-many`, {
			data: { ids },
		});
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);
		yield call(toast, { type: "success", message });

		yield put(actions.fetchSeasons());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get all seasons.
 *
 * @generator
 * @function fetchSeasons
 * @yields {string} - A stringified location.search query.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set season data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchSeasons() {
	try {
		const query = yield select(selectQuery);

		const res = yield call(app.get, `seasons/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setSeasons(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get all seasons ids.
 *
 * @generator
 * @function fetchSeasonsIds
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set season data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchSeasonsIds() {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.get, "seasons/all/ids");
		const data = yield call(parseData, res);

		yield put(actions.setSeasonsIds(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to update an existing season.
 *
 * @generator
 * @function updateSeason
 * @param {object} props - props contain seasonID and season fields.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to go back to a previous URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateSeason({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "season/update", { ...props });
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
 * Creates watchers for all generators.
 *
 * @generator
 * @function seasonsSagas
 * @yields {watchers}
 */
export default function* seasonsSagas() {
	yield all([
		takeLatest(types.SEASONS_CREATE, createSeason),
		takeLatest(types.SEASONS_DELETE, deleteSeason),
		takeLatest(types.SEASONS_DELETE_MANY, deleteManySeasons),
		takeLatest(types.SEASONS_FETCH, fetchSeasons),
		takeLatest(types.SEASONS_FETCH_IDS, fetchSeasonsIds),
		takeLatest(types.SEASONS_UPDATE_EDIT, updateSeason),
	]);
}
