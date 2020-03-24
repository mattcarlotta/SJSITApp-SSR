import * as types from "types";
import * as actions from "actions/Events";

const data = {
	_id: "0123456789",
	callTimes: ["2019-08-09T19:00:38-07:00"],
	eventDate: "2019-08-11T02:30:30.036+00:00",
	eventType: "Game",
	team: "San Jose Sharks",
	opponent: "Anaheim Ducks",
	location: "SAP Center at San Jose",
	notes: "",
	seasonId: "20002001",
	uniform: "Barracuda Jersey",
};

const eventId = "1234567890";

describe("Events Actions", () => {
	it("returns EVENTS_CREATE with data", () => {
		const props = data;
		const value = actions.createEvent(props);

		expect(value).toEqual({
			type: types.EVENTS_CREATE,
			props,
		});
	});

	it("returns EVENTS_DELETE with a eventId", () => {
		const value = actions.deleteEvent(eventId);

		expect(value).toEqual({
			type: types.EVENTS_DELETE,
			eventId,
		});
	});

	it("returns EVENTS_DELETE_MANY with ids", () => {
		const ids = ["01", "02", "03"];
		const value = actions.deleteManyEvents(ids);

		expect(value).toEqual({
			type: types.EVENTS_DELETE_MANY,
			ids,
		});
	});

	it("returns EVENTS_EDIT", () => {
		const value = actions.fetchEvent(eventId);

		expect(value).toEqual({
			type: types.EVENTS_EDIT,
			eventId,
		});
	});

	it("returns EVENTS_FETCH_SCHEDULE", () => {
		const value = actions.fetchEventForScheduling(eventId);

		expect(value).toEqual({
			type: types.EVENTS_FETCH_SCHEDULE,
			eventId,
		});
	});

	it("returns EVENTS_FETCH", () => {
		const value = actions.fetchEvents();

		expect(value).toEqual({
			type: types.EVENTS_FETCH,
		});
	});

	it("returns EVENTS_FETCH_SCHEDULE_EVENTS", () => {
		const params = {
			id: "5d72dffe65ec39141ae78553",
			selectedGames: "My Games",
		};
		const value = actions.fetchScheduleEvents(params);

		expect(value).toEqual({
			type: types.EVENTS_FETCH_SCHEDULE_EVENTS,
			params,
		});
	});

	it("returns EVENTS_SET with an empty array if data is empty", () => {
		const value = actions.setEvents([]);

		expect(value).toEqual({
			type: types.EVENTS_SET,
			payload: [],
		});
	});

	it("returns EVENTS_INIT_NEW_EVENT", () => {
		const value = actions.initializeNewEvent();

		expect(value).toEqual({
			type: types.EVENTS_INIT_NEW_EVENT,
		});
	});

	it("returns EVENTS_RESEND_MAIL", () => {
		const value = actions.resendMail(eventId);

		expect(value).toEqual({
			type: types.EVENTS_RESEND_MAIL,
			eventId,
		});
	});

	it("returns EVENTS_SET with data", () => {
		const value = actions.setEvents(data);

		expect(value).toEqual({
			type: types.EVENTS_SET,
			payload: data,
		});
	});

	it("returns EVENTS_SET_SCHEDULE with an empty object if data is empty", () => {
		const value = actions.setEventForScheduling({});

		expect(value).toEqual({
			type: types.EVENTS_SET_SCHEDULE,
			payload: {},
		});
	});

	it("returns EVENTS_SET_SCHEDULE with data", () => {
		const value = actions.setEventForScheduling(data);

		expect(value).toEqual({
			type: types.EVENTS_SET_SCHEDULE,
			payload: data,
		});
	});

	it("returns EVENTS_SET_EDIT with an empty object if data is empty", () => {
		const value = actions.setEventToEdit({});

		expect(value).toEqual({
			type: types.EVENTS_SET_EDIT,
			payload: {},
		});
	});

	it("returns EVENTS_SET_EDIT with data", () => {
		const value = actions.setEventToEdit(data);

		expect(value).toEqual({
			type: types.EVENTS_SET_EDIT,
			payload: data,
		});
	});

	it("returns EVENTS_SET_NEW_EVENT with an empty object if data is empty", () => {
		const value = actions.setNewEvent({});

		expect(value).toEqual({
			type: types.EVENTS_SET_NEW_EVENT,
			payload: {},
		});
	});

	it("returns EVENTS_SET_NEW_EVENT with data", () => {
		const value = actions.setNewEvent(data);

		expect(value).toEqual({
			type: types.EVENTS_SET_NEW_EVENT,
			payload: data,
		});
	});

	it("returns EVENTS_SET_SCHEDULE_EVENTS with an empty object if data is empty", () => {
		const value = actions.setScheduleEvents({});

		expect(value).toEqual({
			type: types.EVENTS_SET_SCHEDULE_EVENTS,
			payload: [],
		});
	});

	it("returns EVENTS_SET_SCHEDULE_EVENTS with data", () => {
		const value = actions.setScheduleEvents(data);

		expect(value).toEqual({
			type: types.EVENTS_SET_SCHEDULE_EVENTS,
			payload: data,
		});
	});

	it("returns EVENTS_UPDATE with props", () => {
		const props = data;

		const value = actions.updateEvent(props);

		expect(value).toEqual({
			type: types.EVENTS_UPDATE,
			props,
		});
	});

	it("returns EVENTS_UPDATE_SCHEDULE with props", () => {
		const props = {
			callTimes: [],
			userIds: [],
		};

		const value = actions.updateEventSchedule(props);

		expect(value).toEqual({
			type: types.EVENTS_UPDATE_SCHEDULE,
			props,
		});
	});
});
