import Router from "next/router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { app } from "~utils";
import * as actions from "~actions/Events";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as sagas from "~sagas/Events";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import eventReducer from "~reducers/Events";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";

const eventId = "0123456789";
const ids = mocks.ids;

describe("Event Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Member", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new event!";
			props = mocks.eventsData;
		});

		it("logical flow matches pattern for a create event request", () => {
			const res = { data: { message } };

			testSaga(sagas.createEvent, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.post, "event/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(Router.push, "/employee/events/viewall?page=1")
				.next()
				.isDone();
		});

		it("successfully creates a new event", async () => {
			mockApp.onPost("event/create").reply(200, { message });

			return expectSaga(sagas.createEvent, { props })
				.dispatch(actions.createEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new event.";
			mockApp.onPost("event/create").reply(404, { err });

			return expectSaga(sagas.createEvent, { props })
				.dispatch(actions.createEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Event", () => {
		it("logical flow matches pattern for delete event requests", () => {
			const message = "Successfully deleted event.";
			const res = { data: { message } };

			testSaga(sagas.deleteEvent, { eventId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `event/delete/${eventId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchEvents())
				.next()
				.isDone();
		});

		it("successfully deletes a event", async () => {
			const message = "Successfully deleted the event.";
			mockApp.onDelete(`event/delete/${eventId}`).reply(200, { message });

			return expectSaga(sagas.deleteEvent, { eventId })
				.dispatch(actions.deleteEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`event/delete/${eventId}`).reply(404, { err });

			return expectSaga(sagas.deleteEvent, { eventId })
				.dispatch(actions.deleteEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Many Events", () => {
		it("logical flow matches pattern for delete many events requests", () => {
			const message = "Successfully deleted event.";
			const res = { data: { message } };

			testSaga(sagas.deleteManyEvents, { ids })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `events/delete-many`, { data: { ids } })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchEvents())
				.next()
				.isDone();
		});

		it("successfully deletes many events", async () => {
			const message = "Successfully deleted the event.";
			mockApp.onDelete(`events/delete-many`).reply(200, { message });

			return expectSaga(sagas.deleteManyEvents, { ids })
				.dispatch(actions.deleteManyEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`events/delete-many`).reply(404, { err });

			return expectSaga(sagas.deleteManyEvents, { ids })
				.dispatch(actions.deleteManyEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Event", () => {
		let data;
		let data2;
		let data3;
		beforeEach(() => {
			data = { event: mocks.eventsData };
			data2 = { seasonIds: mocks.seasonIdsData };
			data3 = { teams: mocks.teamNamesData };
		});

		it("logical flow matches pattern for fetch event requests", () => {
			const res = { data };
			const res2 = { data2 };
			const res3 = { data3 };

			testSaga(sagas.fetchEvent, { eventId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.get, `event/edit/${eventId}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.call(app.get, "seasons/all/ids")
				.next(res2)
				.call(parseData, res2)
				.next(res2.data2)
				.call(app.get, "teams/all/names")
				.next(res3)
				.call(parseData, res3)
				.next(res3.data3)
				.put(
					actions.setEventToEdit({
						...res.data.event,
						seasonIds: res2.data2.seasonIds,
						teams: res3.data3.names,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a fetch event for editing", async () => {
			mockApp.onGet(`event/edit/${eventId}`).reply(200, data);

			mockApp
				.onGet("seasons/all/ids")
				.reply(200, { seasonIds: mocks.seasonIdsData });

			mockApp
				.onGet("teams/all/names")
				.reply(200, { names: mocks.teamNamesData });

			return expectSaga(sagas.fetchEvent, { eventId })
				.dispatch(actions.fetchEvent)
				.withReducer(eventReducer)
				.hasFinalState({
					data: [],
					editEvent: {
						...mocks.eventsData,
						seasonIds: mocks.seasonIdsData,
						teams: mocks.teamNamesData,
					},
					members: [],
					newEvent: {},
					schedule: {},
					scheduleEvents: [],
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that event.";
			mockApp.onGet(`event/edit/${eventId}`).reply(404, { err });

			return expectSaga(sagas.fetchEvent, { eventId })
				.dispatch(actions.fetchEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Event For Scheduling", () => {
		let scheduleData;
		let memberCountData;
		beforeEach(() => {
			scheduleData = { schedule: mocks.eventForSchedulingData };
			memberCountData = { members: mocks.memberCountData };
		});

		it("logical flow matches pattern for fetch event for scheduling requests", () => {
			const res = { scheduleData };
			const res2 = { memberCountData };

			const params = { params: { eventId } };

			testSaga(sagas.fetchEventForScheduling, { eventId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.get, `event/review/${eventId}`)
				.next(res)
				.call(parseData, res)
				.next(res.scheduleData)
				.call(app.get, `members/eventcounts`, params)
				.next(res2)
				.call(parseData, res2)
				.next(res2.memberCountData)
				.put(
					actions.setEventForScheduling({
						...res.scheduleData,
						...res2.memberCountData,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a fetch event for scheduling", async () => {
			mockApp.onGet(`event/review/${eventId}`).reply(200, scheduleData);
			mockApp.onGet(`members/eventcounts`).reply(200, memberCountData);

			return expectSaga(sagas.fetchEventForScheduling, { eventId })
				.dispatch(actions.fetchEventForScheduling)
				.withReducer(eventReducer)
				.hasFinalState({
					data: [],
					editEvent: {},
					members: mocks.memberCountData,
					newEvent: {},
					schedule: mocks.eventForSchedulingData,
					scheduleEvents: [],
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that event for scheduling.";
			mockApp.onGet(`event/review/${eventId}`).reply(404, { err });

			return expectSaga(sagas.fetchEventForScheduling, { eventId })
				.dispatch(actions.fetchEventForScheduling)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Events", () => {
		let data;
		let query;
		beforeEach(() => {
			data = { events: mocks.eventsData, totalDocs: 1 };
			query = "?page=1";
		});

		it("logical flow matches pattern for fetch events requests", () => {
			const res = { data };

			testSaga(sagas.fetchEvents)
				.next()
				.select(selectQuery)
				.next()
				.call(app.get, `events/allundefined`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setEvents(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches all events", async () => {
			mockApp.onGet(`events/all${query}`).reply(200, data);

			return expectSaga(sagas.fetchEvents)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchEvents)
				.withReducer(eventReducer)
				.hasFinalState({
					data: mocks.eventsData,
					isLoading: false,
					totalDocs: 1,
					editEvent: {},
					members: [],
					newEvent: {},
					schedule: {},
					scheduleEvents: [],
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch events.";
			mockApp.onGet(`events/all${query}`).reply(404, { err });

			return expectSaga(sagas.fetchEvents)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Scheduled Events", () => {
		let data;
		let params;
		beforeEach(() => {
			data = { events: mocks.scheduleEventsData };
			params = {
				selectedDate: "2018-09-01T00:00:00-07:00",
				selectedGame: "All Games",
			};
		});

		it("logical flow matches pattern for fetch scheduled events requests", () => {
			const res = { data };

			testSaga(sagas.fetchScheduleEvents, { params })
				.next()
				.call(app.get, "events/schedule", { params })
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setScheduleEvents(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches all scheduled events", async () => {
			mockApp.onGet("events/schedule").reply(200, data);

			return expectSaga(sagas.fetchScheduleEvents, { params })
				.dispatch(actions.fetchScheduleEvents)
				.withReducer(eventReducer)
				.hasFinalState({
					data: [],
					editEvent: {},
					members: [],
					newEvent: {},
					schedule: {},
					scheduleEvents: mocks.scheduleEventsData,
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch scheduled events.";
			mockApp.onGet("events/schedule").reply(404, { err });

			return expectSaga(sagas.fetchScheduleEvents, { params })
				.dispatch(actions.fetchScheduleEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Resend Event Mail", () => {
		it("logical flow matches pattern for resend event requests", () => {
			const message = "Successfully resent mail.";
			const res = { data: { message } };

			testSaga(sagas.resendEventEmails, { eventId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, `event/resend-email/${eventId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "info", message: res.data.message })
				.next()
				.put(actions.fetchEvents())
				.next()
				.isDone();
		});

		it("successfully resend an event mail", async () => {
			const message = "Successfully resent the event mail.";
			mockApp.onPut(`event/resend-email/${eventId}`).reply(200, { message });

			return expectSaga(sagas.resendEventEmails, { eventId })
				.dispatch(actions.resendEventEmails)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to resend the event mail.";
			mockApp.onPut(`event/resend-email/${eventId}`).reply(404, { err });

			return expectSaga(sagas.resendEventEmails, { eventId })
				.dispatch(actions.resendEventEmails)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Event", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the event!";
			props = mocks.eventsData;
		});

		it("logical flow matches pattern for update event requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateEvent, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "event/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.back)
				.next()
				.isDone();
		});

		it("successfully updates an event", async () => {
			mockApp.onPut("event/update").reply(200, { message });

			return expectSaga(sagas.updateEvent, { props })
				.dispatch(actions.updateEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the event.";
			mockApp.onPut("event/update").reply(404, { err });

			return expectSaga(sagas.updateEvent, { props })
				.dispatch(actions.updateEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Scheduled Event", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the scheduled event!";
			props = mocks.eventsData;
		});

		it("logical flow matches pattern for update scheduled event requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateEventSchedule, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "event/update/schedule", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.back)
				.next()
				.isDone();
		});

		it("successfully updates a scheduled event", async () => {
			mockApp.onPut("event/update/schedule").reply(200, { message });

			return expectSaga(sagas.updateEventSchedule, { props })
				.dispatch(actions.updateEventSchedule)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the scheduled event.";
			mockApp.onPut("event/update/schedule").reply(404, { err });

			return expectSaga(sagas.updateEventSchedule, { props })
				.dispatch(actions.updateEventSchedule)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});
});
