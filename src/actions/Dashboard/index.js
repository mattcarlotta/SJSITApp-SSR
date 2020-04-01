import isEmpty from "lodash.isempty";
import * as types from "~types";

/**
 * Fetches event distribution by month.
 *
 * @function fetchEventDistribution
 * @param {object} params - startDate and endDate
 * @returns {object}
 */
export const fetchEventDistribution = params => ({
	type: types.DASHBOARD_FETCH_EVENT_DISTRIBUTION,
	params,
});

/**
 * Fetches current or upcoming event by string.
 *
 * @function fetchEvents
 * @param {string} selectedEvent - string "today" or "upcoming"
 * @returns {object}
 */
export const fetchEvents = selectedEvent => ({
	type: types.DASHBOARD_FETCH_EVENTS,
	selectedEvent: selectedEvent.toLowerCase(),
});

/**
 * Resets dashboard state.
 *
 * @function resetDashboard
 * @returns {object}
 */
export const resetDashboard = () => ({
	type: types.DASHBOARD_RESET,
});

/**
 * Sets dashboard AP form data to redux state for viewing/editing
 *
 * @function setAPForm
 * @param {object} data - contains apform data ({_id, sendEmailNotificationsDate, startMonth, endMonth, expirationDate, notes, eventCounts}).
 * @returns {object}
 */
export const setAPForm = data => ({
	type: types.DASHBOARD_SET_APFORM,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets dashboard availability for an employee to redux state
 *
 * @function setAvailability
 * @param {object} data - contains availability data ({_id, label, value}).
 * @returns {object}
 */
export const setAvailability = data => ({
	type: types.DASHBOARD_SET_AVAILABILITY,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets dashboard event distribution to redux state
 *
 * @function setEventDistribution
 * @param {array} data - contains events data ([{name, Event Count}]).
 * @returns {object}
 */
export const setEventDistribution = data => ({
	type: types.DASHBOARD_SET_EVENT_DISTRIBUTION,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets events to redux state
 *
 * @function setEvents
 * @param {array} data - contains events data ([{_id, eventType,location,callTimes, uniform,	seasonId, eventDate, notes, scheduledEmployees}]).
 * @returns {object}
 */
export const setEvents = data => ({
	type: types.DASHBOARD_SET_EVENTS,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets members availability for staff reviewing to redux state
 *
 * @function setMembersAvailability
 * @param {array} data - contains availability data ([{eventCounts,membersAvailability, months}]).
 * @returns {object}
 */
export const setMembersAvailability = data => ({
	type: types.DASHBOARD_SET_MEMBERS_AVAILABILITY,
	payload: !isEmpty(data) ? data : [],
});
