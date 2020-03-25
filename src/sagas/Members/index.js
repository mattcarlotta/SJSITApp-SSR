import Router from "next/router";
import { all, put, call, select, takeLatest } from "redux-saga/effects";
import { app } from "~utils";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import { signoutUser } from "~actions/Auth";
import * as actions from "~actions/Members";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import toast from "~components/Body/Toast";
import * as types from "~types";

/**
 * Attempts to create a new member.
 *
 * @generator
 * @function createMember
 * @param {object} props - props contain seasonId, role and authorized email fields.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createMember({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.post, "token/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield call(Router.push, "/employee/members/authorizations/viewall?page=1");
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete a member.
 *
 * @generator
 * @function deleteMember
 * @param {object} memberId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch members data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteMember({ memberId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `member/delete/${memberId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield put(actions.fetchMembers());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts many members.
 *
 * @generator
 * @function deleteManyMembers
 * @param {object} ids
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch members data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteManyMembers({ ids }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `members/delete-many`, {
			data: { ids },
		});
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield put(actions.fetchMembers());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete a token.
 *
 * @generator
 * @function deleteToken
 * @param {object} tokenId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch tokens data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteToken({ tokenId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `token/delete/${tokenId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield put(actions.fetchTokens());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete many tokens.
 *
 * @generator
 * @function deleteManyTokens
 * @param {object} ids
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch tokens data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteManyTokens({ ids }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.delete, `tokens/delete-many`, { data: { ids } });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield put(actions.fetchTokens());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get a single member's availability profile.
 *
 * @generator
 * @function fetchAvailability
 * @param {object} params
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (member availability info).
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchAvailability({ params }) {
	try {
		const res = yield call(app.get, "member/availability", {
			params,
		});
		const data = yield call(parseData, res);

		yield put(actions.setMemberAvailability(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get all member's names.
 *
 * @generator
 * @function fetchMemberNames
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (members names info).
 * @yields {action} - A redux action to set member names data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMemberNames() {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.get, "members/names");
		const data = yield call(parseData, res);

		yield put(actions.setMemberNames(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get a single member profile for review/editing.
 *
 * @generator
 * @function fetchProfile
 * @param {object} tokenId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (basic member info).
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (member event response).
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {actions} - A redux action to go back to a previous URL and to display a server message by type.
 */

export function* fetchProfile({ memberId }) {
	try {
		let res = yield call(app.get, `member/review/${memberId}`);
		const basicMemberInfo = yield call(parseData, res);

		res = yield call(app.get, "member/availability", {
			params: { id: memberId },
		});
		const memberAvailability = yield call(parseData, res);

		yield put(
			actions.setMemberToReview({
				...basicMemberInfo,
				memberAvailability,
			}),
		);
	} catch (e) {
		yield call(Router.back);
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get a single member event profile for review/editing.
 *
 * @generator
 * @function fetchMemberEvents
 * @param {object} params
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set member event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMemberEvents({ params }) {
	try {
		const res = yield call(app.get, "member/events", { params });
		const data = yield call(parseData, res);

		yield put(actions.setMemberEventsByDate(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get all members.
 *
 * @generator
 * @function fetchMembers
 * @yields {string} - A stringified location.search query.
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set members data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMembers() {
	try {
		const query = yield select(selectQuery);

		const res = yield call(app.get, `members/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setMembers(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get a single member's settings for review/editing.
 *
 * @generator
 * @function fetchSettings
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (basic member info).
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (member event response).
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {actions} - A redux action to push to a URL and to display a server message by type.
 */

export function* fetchSettings() {
	try {
		let res = yield call(app.get, `member/settings`);
		const basicMemberInfo = yield call(parseData, res);

		res = yield call(app.get, "member/settings/availability");
		const memberAvailability = yield call(parseData, res);

		yield put(
			actions.setMemberToReview({
				...basicMemberInfo,
				memberAvailability,
			}),
		);
	} catch (e) {
		yield call(Router.push, "/employee/dashboard");
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get a single member's availability profile.
 *
 * @generator
 * @function fetchSettingsAvailability
 * @param {object} params - id and selectedDate
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (member availability info).
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchSettingsAvailability({ params }) {
	try {
		const res = yield call(app.get, "member/settings/availability", {
			params,
		});
		const data = yield call(parseData, res);

		yield put(actions.setMemberAvailability(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to get a single member event responses for viewing.
 *
 * @generator
 * @function fetchMemberSettingsEvents
 * @param {object} params - id, selectedDate and selectedGames
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMemberSettingsEvents({ params }) {
	try {
		const res = yield call(app.get, "member/settings/events", { params });
		const data = yield call(parseData, res);

		yield put(actions.setMemberEventsByDate(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to fetch a token for editing.
 *
 * @generator
 * @function fetchToken
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set token data to redux state.
 * @throws {actions} - A redux action to back to a previous URL and to display a server message by type.
 */

export function* fetchToken({ tokenId }) {
	try {
		yield put(resetServerMessage());

		let res = yield call(app.get, `token/edit/${tokenId}`);
		const tokenData = yield call(parseData, res);

		res = yield call(app.get, "seasons/all/ids");
		const seasonData = yield call(parseData, res);

		yield put(
			actions.setToken({ ...tokenData.token, seasonIds: seasonData.seasonIds }),
		);
	} catch (e) {
		yield call(Router.back);
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to fetch a token for editing.
 *
 * @generator
 * @function fetchTokens
 * @yields {string} - A stringified location.search query.
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set tokens data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchTokens() {
	try {
		const query = yield select(selectQuery);

		const res = yield call(app.get, `tokens/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setTokens(data));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to resend an authorization to a member.
 *
 * @generator
 * @function resendToken
 * @param {string} tokenId
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to refetch authorizations.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* resendToken({ tokenId }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, `token/resend/${tokenId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield put(actions.fetchTokens());
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to update an existing member.
 *
 * @generator
 * @function updateMember
 * @param {object} props - props contain id, email, firstName, lastName and role.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch member by id to update data..
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMember({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "member/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield put(actions.fetchMember(props._id));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to update an existing member.
 *
 * @generator
 * @function updateMemberStatus
 * @param {object} props - props contain id and status.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch member by id to update data.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMemberStatus({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "member/updatestatus", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield put(actions.fetchMember(props._id));
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to update an existing member token.
 *
 * @generator
 * @function updateMemberToken
 * @param {object} props - props contain id, seasonId, role and authorizedEmail.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMemberToken({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "token/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		yield call(Router.back);
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to update an existing member's settings.
 *
 * @generator
 * @function updateSettings
 * @param {object} props - props contain id, email, firstName, lastName and role.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to to either refetch member data or sign user out if they reset password.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateSettings({ props }) {
	try {
		yield put(resetServerMessage());

		const res = yield call(app.put, "member/settings/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				message,
			}),
		);

		if (message !== "Successfully updated your settings.") {
			yield put(signoutUser());
		} else {
			yield put(actions.fetchMemberSettings());
		}
	} catch (e) {
		yield put(setServerMessage({ message: e.toString() }));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function membersSagas
 * @yields {watchers}
 */
export default function* membersSagas() {
	yield all([
		takeLatest(types.MEMBERS_CREATE, createMember),
		takeLatest(types.MEMBERS_DELETE, deleteMember),
		takeLatest(types.MEMBERS_DELETE_MANY, deleteManyMembers),
		takeLatest(types.MEMBERS_DELETE_TOKEN, deleteToken),
		takeLatest(types.MEMBERS_DELETE_MANY_TOKENS, deleteManyTokens),
		takeLatest(types.MEMBERS_FETCH_AVAILABILITY, fetchAvailability),
		takeLatest(types.MEMBERS_FETCH_NAMES, fetchMemberNames),
		takeLatest(types.MEMBERS_REVIEW, fetchProfile),
		takeLatest(types.MEMBERS_FETCH, fetchMembers),
		takeLatest(types.MEMBERS_FETCH_EVENTS, fetchMemberEvents),
		takeLatest(types.MEMBERS_FETCH_SETTINGS, fetchSettings),
		takeLatest(
			types.MEMBERS_FETCH_SETTINGS_AVAILABILITY,
			fetchSettingsAvailability,
		),
		takeLatest(types.MEMBERS_FETCH_SETTINGS_EVENTS, fetchMemberSettingsEvents),
		takeLatest(types.MEMBERS_FETCH_TOKEN, fetchToken),
		takeLatest(types.MEMBERS_FETCH_TOKENS, fetchTokens),
		takeLatest(types.MEMBERS_UPDATE, updateMember),
		takeLatest(types.MEMBERS_RESEND_TOKEN, resendToken),
		takeLatest(types.MEMBERS_UPDATE_SETTINGS, updateSettings),
		takeLatest(types.MEMBERS_UPDATE_STATUS, updateMemberStatus),
		takeLatest(types.MEMBERS_UPDATE_TOKEN, updateMemberToken),
	]);
}
