import * as types from "~types";
import eventReducer, { initialState } from "~reducers/Events";
import * as mocks from "~reducers/__mocks__/reducers.mocks";

const eventsData = {
	events: mocks.eventsData,
	totalDocs: 1,
};

describe("Event Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(eventReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets events data", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET,
			payload: eventsData,
		});

		expect(state).toEqual({
			data: mocks.eventsData,
			isLoading: false,
			totalDocs: 1,
			editEvent: {},
			members: [],
			newEvent: {},
			schedule: {},
			scheduleEvents: [],
		});
	});

	it("when fetching all events, resets to initialState", () => {
		let state = eventReducer(undefined, {
			type: types.EVENTS_SET,
			payload: eventsData,
		});

		state = eventReducer(state, {
			type: types.EVENTS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching an event for editing, resets to initialState", () => {
		let state = eventReducer(undefined, {
			type: types.EVENTS_SET,
			payload: eventsData,
		});

		state = eventReducer(state, {
			type: types.EVENTS_EDIT,
		});

		expect(state).toEqual(initialState);
	});

	it("sets event for editing", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET_EDIT,
			payload: { ...mocks.eventsData },
		});

		expect(state).toEqual({
			data: [],
			editEvent: { ...mocks.eventsData },
			members: [],
			newEvent: {},
			schedule: {},
			scheduleEvents: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets up new event form", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET_NEW_EVENT,
			payload: { ...mocks.eventsData },
		});

		expect(state).toEqual({
			data: [],
			editEvent: {},
			members: [],
			newEvent: { ...mocks.eventsData },
			schedule: {},
			scheduleEvents: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets a scheduled event for viewing and assigning", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET_SCHEDULE,
			payload: { schedule: mocks.eventForSchedulingData },
		});

		expect(state).toEqual({
			data: [],
			editEvent: {},
			newEvent: {},
			schedule: mocks.eventForSchedulingData,
			scheduleEvents: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets scheduled events for viewing", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET_SCHEDULE_EVENTS,
			payload: { events: mocks.scheduleEventsData },
		});

		expect(state).toEqual({
			data: [],
			editEvent: {},
			members: [],
			newEvent: {},
			schedule: {},
			scheduleEvents: mocks.scheduleEventsData,
			isLoading: true,
			totalDocs: 0,
		});
	});
});
