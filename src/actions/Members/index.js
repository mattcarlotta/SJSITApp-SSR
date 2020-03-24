import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new member.
 *
 * @function createMember
 * @param {object} props - props contain seasonId, role and authorized email fields.
 * @returns {object}
 */
export const createMember = props => ({
	type: types.MEMBERS_CREATE,
	props,
});

/**
 * Deletes a new member.
 *
 * @function deleteMember
 * @param {string} memberId
 * @returns {object}
 */
export const deleteMember = memberId => ({
	type: types.MEMBERS_DELETE,
	memberId,
});

/**
 * Deletes many members.
 *
 * @function deleteManyMembers
 * @param {array} ids
 * @returns {object}
 */
export const deleteManyMembers = ids => ({
	type: types.MEMBERS_DELETE_MANY,
	ids,
});

/**
 * Deletes many tokens.
 *
 * @function deleteManyTokens
 * @param {array} ids
 * @returns {object}
 */
export const deleteManyTokens = ids => ({
	type: types.MEMBERS_DELETE_MANY_TOKENS,
	ids,
});

/**
 * Deletes a new member token.
 *
 * @function deleteToken
 * @param {string} tokenId
 * @returns {object}
 */
export const deleteToken = tokenId => ({
	type: types.MEMBERS_DELETE_TOKEN,
	tokenId,
});

/**
 * Fetches a single member for viewing/editing.
 *
 * @function fetchMember
 * @param {string} memberId
 * @returns {object}
 */
export const fetchMember = memberId => ({
	type: types.MEMBERS_REVIEW,
	memberId,
});

/**
 * Fetches all members.
 *
 * @function fetchMembers
 * @returns {object}
 */
export const fetchMembers = () => ({
	type: types.MEMBERS_FETCH,
});

/**
 * Fetches member profile availability.
 *
 * @function fetchMemberAvailability
 * @param {object} params - params just contain id
 * @returns {object}
 */
export const fetchMemberAvailability = params => ({
	type: types.MEMBERS_FETCH_AVAILABILITY,
	params,
});

/**
 * Fetches a single member's profile events based upon a date.
 *
 * @function fetchMemberEvents
 * @param {object} params - memberid and selectedDate
 * @returns {object}
 */
export const fetchMemberEvents = params => ({
	type: types.MEMBERS_FETCH_EVENTS,
	params,
});

/**
 * Fetches all member's names.
 *
 * @function fetchMemberNames
 * @returns {object}
 */
export const fetchMemberNames = () => ({
	type: types.MEMBERS_FETCH_NAMES,
});

/**
 * Fetches member's settings.
 *
 * @function fetchMemberSettings
 * @returns {object}
 */
export const fetchMemberSettings = () => ({
	type: types.MEMBERS_FETCH_SETTINGS,
});

/**
 * Fetches a member's availability.
 *
 * @function fetchMemberSettingsAvailability
 * @param {object} params -  params just contain a selectedDate
 * @returns {object}
 */
export const fetchMemberSettingsAvailability = params => ({
	type: types.MEMBERS_FETCH_SETTINGS_AVAILABILITY,
	params,
});

/**
 * Fetches a single member's events for the settings page based upon a date.
 *
 * @function fetchMemberSettingsEvents
 * @param {object} params - selectedDate
 * @returns {object}
 */
export const fetchMemberSettingsEvents = params => ({
	type: types.MEMBERS_FETCH_SETTINGS_EVENTS,
	params,
});

/**
 * Fetches a single token for editing.
 *
 * @function fetchToken
 * @param {string} tokenId
 * @returns {object}
 */
export const fetchToken = tokenId => ({
	type: types.MEMBERS_FETCH_TOKEN,
	tokenId,
});

/**
 * Fetches all tokens.
 *
 * @function fetchTokens
 * @returns {object}
 */
export const fetchTokens = () => ({
	type: types.MEMBERS_FETCH_TOKENS,
});

/**
 * Resends a single token by mail.
 *
 * @function resendToken
 * @param {string} tokenId
 * @returns {object}
 */
export const resendToken = tokenId => ({
	type: types.MEMBERS_RESEND_TOKEN,
	tokenId,
});

/**
 * Resets member data back to inital state.
 *
 * @function resetMembers
 * @returns {object}
 */
export const resetMembers = () => ({
	type: types.MEMBERS_RESET,
});

/**
 * Sets any members for the ViewMembers page to redux state
 *
 * @function setMembers
 * @param {array} data - contains member data ([id, memberId, members, startDate, endDate]).
 * @returns {object}
 */
export const setMembers = data => ({
	type: types.MEMBERS_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a members profile availability stats to redux state
 *
 * @function setMemberAvailability
 * @param {object} data - contains memberAvailiability ({memberScheduleEvents, memberResponseCount, percentAvailable}).
 * @returns {object}
 */
export const setMemberAvailability = data => ({
	type: types.MEMBERS_SET_AVAILABILITY,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets a members profile events responses to redux state
 *
 * @function setMemberEventsByDate
 * @param {array} data - contains member event response data ([id, team, opponent, eventDate, response, notes]).
 * @returns {object}
 */
export const setMemberEventsByDate = data => ({
	type: types.MEMBERS_SET_EVENTS,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a members' names for emailing to redux state
 *
 * @function setMemberNames
 * @param {array} data - contains member event response data ([id, names, email]).
 * @returns {object}
 */
export const setMemberNames = data => ({
	type: types.MEMBERS_SET_NAMES,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets a single member to redux state for reviewing.
 *
 * @function setMemberToReview
 * @param {object} data - memberId and member duration fields
 * @returns {object}
 */
export const setMemberToReview = data => ({
	type: types.MEMBERS_SET_REVIEW,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets token for viewing/editing to redux state.
 *
 * @function setToken
 * @param {object} data - contains token data ([id, authorizedEmail, role, seasonId, token]).
 * @returns {object}
 */
export const setToken = data => ({
	type: types.MEMBERS_SET_TOKEN,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets all tokens for the ViewAuthorizations page to redux state.
 *
 * @function setTokens
 * @param {array} data - contains token data ([id, authorizedEmail, role, seasonId, token]).
 * @returns {object}
 */
export const setTokens = data => ({
	type: types.MEMBERS_SET_TOKENS,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Updates a single member.
 *
 * @function updateMember
 * @param {object} data - id, email, firstName, lastName and role.
 * @returns {object}
 */
export const updateMember = props => ({
	type: types.MEMBERS_UPDATE,
	props,
});

/**
 * Updates a single member status.
 *
 * @function updateMemberStatus
 * @param {object} props - contains id and status.
 * @returns {object}
 */
export const updateMemberStatus = props => ({
	type: types.MEMBERS_UPDATE_STATUS,
	props,
});

/**
 * Updates a single member status.
 *
 * @function updateMemberToken
 * @param {object} props - contains id, seasonId, role and authorizedEmail.
 * @returns {object}
 */
export const updateMemberToken = props => ({
	type: types.MEMBERS_UPDATE_TOKEN,
	props,
});

/**
 * Updates a single member's settings.
 *
 * @function updateSettings
 * @param {object} data - email, firstName, lastName
 * @returns {object}
 */
export const updateSettings = props => ({
	type: types.MEMBERS_UPDATE_SETTINGS,
	props,
});
