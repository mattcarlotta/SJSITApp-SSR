import moment from "moment-timezone";
import * as types from "~types";
import dashboardReducer, { initialState } from "~reducers/Dashboard";
import * as mocks from "~reducers/__mocks__/~reducers.mocks";

const eventsData = {
	events: mocks.eventsData,
};

const eventDistribution = {
	members: mocks.eventDistribution,
};

const apForm = {
	apform: mocks.form,
};

const months = [moment().format(), moment().format()];

const availability = {
	memberAvailability: mocks.membersAvailability,
	months,
};

describe("Dashboard Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(dashboardReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets and resets apform data", () => {
		let state = dashboardReducer(undefined, {
			type: types.DASHBOARD_SET_APFORM,
			payload: apForm,
		});

		expect(state).toEqual({
			...initialState,
			apform: {
				data: mocks.form,
				isLoading: false,
			},
		});

		state = dashboardReducer(undefined, {
			type: types.DASHBOARD_FETCH_APFORM,
		});

		expect(state).toEqual(initialState);
	});

	it("sets and resets member availability data", () => {
		let state = dashboardReducer(undefined, {
			type: types.DASHBOARD_SET_AVAILABILITY,
			payload: availability,
		});

		expect(state).toEqual({
			...initialState,
			eventAvailability: {
				data: mocks.events,
				months,
				isLoading: false,
			},
		});

		state = dashboardReducer(state, {
			type: types.DASHBOARD_FETCH_AVAILABILITY,
		});

		expect(state).toEqual(initialState);
	});

	it("sets and resets events data", () => {
		let state = dashboardReducer(undefined, {
			type: types.DASHBOARD_SET_EVENTS,
			payload: eventsData,
		});

		expect(state).toEqual({
			...initialState,
			events: {
				data: mocks.eventsData,
				isLoading: false,
			},
		});

		state = dashboardReducer(state, {
			type: types.DASHBOARD_FETCH_EVENTS,
		});

		expect(state).toEqual(initialState);
	});

	it("sets and resets event distribution data", () => {
		let state = dashboardReducer(undefined, {
			type: types.DASHBOARD_SET_EVENT_DISTRIBUTION,
			payload: eventDistribution,
		});

		expect(state).toEqual({
			...initialState,
			eventCounts: mocks.eventDistribution,
		});

		state = dashboardReducer(state, {
			type: types.DASHBOARD_FETCH_EVENT_DISTRIBUTION,
		});

		expect(state).toEqual(initialState);
	});

	it("sets and resets members availablity data", () => {
		let state = dashboardReducer(undefined, {
			type: types.DASHBOARD_SET_MEMBERS_AVAILABILITY,
			payload: availability,
		});

		expect(state).toEqual({
			...initialState,
			membersAvailability: {
				data: mocks.events,
				months,
				isLoading: false,
			},
		});

		state = dashboardReducer(state, {
			type: types.DASHBOARD_FETCH_MEMBERS_AVAILABILITY,
		});

		expect(state).toEqual(initialState);
	});
});
