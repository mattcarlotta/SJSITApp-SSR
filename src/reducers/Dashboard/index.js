import { HYDRATE } from "next-redux-wrapper";
import * as types from "~types";

const apform = {
	data: {},
	isLoading: true,
};

const eventAvailability = {
	data: [],
	months: [],
	isLoading: true,
};

const events = {
	data: [],
	isLoading: true,
};

const eventCounts = [];

const membersAvailability = {
	data: [],
	isLoading: true,
	months: [],
};

export const initialState = {
	apform,
	eventAvailability,
	events,
	eventCounts,
	membersAvailability,
};

/**
 * @function dashboardReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - dashboard state.
 */
const dashboardReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case HYDRATE:
			return { ...state, ...payload.dashboard };
		case types.DASHBOARD_RESET: {
			return initialState;
		}
		case types.DASHBOARD_FETCH_APFORM: {
			return { ...state, apform };
		}
		case types.DASHBOARD_FETCH_AVAILABILITY: {
			return { ...state, eventAvailability };
		}
		case types.DASHBOARD_FETCH_EVENTS: {
			return { ...state, events };
		}
		case types.DASHBOARD_FETCH_EVENT_DISTRIBUTION: {
			return { ...state, eventCounts };
		}
		case types.DASHBOARD_FETCH_MEMBERS_AVAILABILITY: {
			return { ...state, membersAvailability };
		}
		case types.DASHBOARD_SET_APFORM: {
			return { ...state, apform: { data: payload.apform, isLoading: false } };
		}
		case types.DASHBOARD_SET_AVAILABILITY: {
			return {
				...state,
				eventAvailability: {
					data: payload.eventAvailability,
					months: payload.months,
					isLoading: false,
				},
			};
		}
		case types.DASHBOARD_SET_EVENT_DISTRIBUTION: {
			return {
				...state,
				eventCounts: payload.members,
			};
		}
		case types.DASHBOARD_SET_EVENTS: {
			return { ...state, events: { data: payload.events, isLoading: false } };
		}
		case types.DASHBOARD_SET_MEMBERS_AVAILABILITY: {
			return {
				...state,
				membersAvailability: {
					data: payload.membersAvailability,
					isLoading: false,
					months: payload.months,
				},
			};
		}
		default: {
			return state;
		}
	}
};

export default dashboardReducer;
