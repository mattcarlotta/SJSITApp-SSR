import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "~utils";
import { setTeamNames } from "~actions/Teams";
import { setServerMessage } from "~actions/Messages";
import { parseData } from "~utils/parseResponse";
import toast from "~components/Body/Toast";
import * as types from "~types";

/**
 * Attempts to get all team names.
 *
 * @generator
 * @function fetchTeamNames
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set team data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchTeamNames() {
	try {
		const res = yield call(app.get, "teams/all/names");
		const data = yield call(parseData, res);

		yield put(setTeamNames(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function teamsSagas
 * @yields {watchers}
 */
export default function* teamsSagas() {
	yield all([takeLatest(types.TEAMS_FETCH_NAMES, fetchTeamNames)]);
}
