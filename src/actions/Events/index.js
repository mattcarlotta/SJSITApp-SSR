import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new event.
 *
 * @function createEvent
 * @param {object} props - props contain league, eventType, location, timeSlots, uniform, start date and time, and seasonId.
 * @returns {object}
 */
export const createEvent = props => ({
	type: types.EVENTS_CREATE,
	props,
});

/**
 * Deletes a new event.
 *
 * @function deleteEvent
 * @param {string} eventId
 * @returns {object}
 */
export const deleteEvent = eventId => ({
	type: types.EVENTS_DELETE,
	eventId,
});

/**
 * Deletes many events.
 *
 * @function deleteManyEvents
 * @param {array} ids
 * @returns {object}
 */
export const deleteManyEvents = ids => ({
	type: types.EVENTS_DELETE_MANY,
	ids,
});

/**
 * Fetches a single event for editing.
 *
 * @function fetchEvent
 * @param {string} eventId
 * @returns {object}
 */
export const fetchEvent = eventId => ({
	type: types.EVENTS_EDIT,
	eventId,
});

/**
 * Fetches a single event for scheduling.
 *
 * @function fetchEventForSchedudling
 * @param {string} eventId
 * @returns {object}
 */
export const fetchEventForScheduling = eventId => ({
	type: types.EVENTS_FETCH_SCHEDULE,
	eventId,
});

/**
 * Fetches all events.
 *
 * @function fetchEvents
 * @returns {object}
 */
export const fetchEvents = () => ({
	type: types.EVENTS_FETCH,
});

/**
 * Fetches all events for schedule page.
 *
 * @function fetchScheduleEvents
 * @param {array} params - selectedDate and all games or user scheduled games
 * @returns {object}
 */
export const fetchScheduleEvents = params => ({
	type: types.EVENTS_FETCH_SCHEDULE_EVENTS,
	params,
});

/**
 * Fetches season ids and team names for new event form.
 *
 * @function initializeNewEvent
 * @returns {object}
 */
export const initializeNewEvent = () => ({
	type: types.EVENTS_INIT_NEW_EVENT,
});

/**
 * Resend an event's email reminders.
 *
 * @function resendMail
 * @param {string} eventId
 * @returns {object}
 */
export const resendMail = eventId => ({
	type: types.EVENTS_RESEND_MAIL,
	eventId,
});

/**
 * Sets any members from API to redux state
 *
 * @function setEvents
 * @param {array} data - contains events data ([_id, league, eventType,location,	callTimes, uniform,		seasonId, eventDate, notes, employeeResponses, scheduledEmployees]).
 * @returns {object}
 */
export const setEvents = data => ({
	type: types.EVENTS_SET,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Fetches a single event for scheduling.
 *
 * @function setEventForScheduling
 * @param {object} data - [{event}, {users}, {columns}]
 * @returns {object}
 */
export const setEventForScheduling = data => ({
	type: types.EVENTS_SET_SCHEDULE,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets a single season to redux state for editing.
 *
 * @function setEventToEdit
 * @param {object} data - contains event data ({_id, league, eventType,location,	callTimes, uniform,		seasonId, eventDate, notes, employeeResponses, scheduledEmployees}).
 * @returns {object}
 */
export const setEventToEdit = data => ({
	type: types.EVENTS_SET_EDIT,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Initialize a new event form with seasonIds and teams.
 *
 * @function setNewEvent
 * @param {object} data - contains newEvent data ({seasonIds, teams}).
 * @returns {object}
 */
export const setNewEvent = data => ({
	type: types.EVENTS_SET_NEW_EVENT,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets scheduled events for the schedule page.
 *
 * @function setScheduledEvents
 * @param {array} data - contains newEvent data ({eventType, eventDate, team, opponent, uniform, location, notes, scheduledEmployees}).
 * @returns {object}
 */
export const setScheduleEvents = data => ({
	type: types.EVENTS_SET_SCHEDULE_EVENTS,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Updates a single event.
 *
 * @function updateEvent
 * @param {object} data - contains event data ({_id, league, eventType,location,	callTimes, uniform,		seasonId, eventDate, notes, employeeResponses, scheduledEmployees}).
 * @returns {object}
 */
export const updateEvent = props => ({
	type: types.EVENTS_UPDATE,
	props,
});

/**
 * Updates a single event's schedule.
 *
 * @function updateEventSchedule
 * @param {object} data - contains event schedule data ([{ callTime, userIds }]).
 * @returns {object}
 */
export const updateEventSchedule = props => ({
	type: types.EVENTS_UPDATE_SCHEDULE,
	props,
});
