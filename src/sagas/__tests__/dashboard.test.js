import { expectSaga, testSaga } from "redux-saga-test-plan";
import app from "~utils/axiosConfig";
import * as actions from "~actions/Dashboard";
import * as sagas from "~sagas/Dashboard";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import dashboardReducer from "~reducers/Dashboard";
import { parseData } from "~utils/parseResponse";

describe("Dashboard Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Fetch Event Counts Distribution", () => {
		let data;
		let params;
		beforeEach(() => {
			data = { members: mocks.memberEventDistributionCounts };
			params = {
				startDate: "2000-10-06T07:00:00.000+00:00",
				endDate: "2000-11-06T07:00:00.000+00:00",
			};
		});

		it("logical flow matches pattern for fetch event distribution requests", () => {
			const res = { data };

			testSaga(sagas.fetchEventDistribution, { params })
				.next()
				.call(app.get, `dashboard/event-distribution`, {
					params: { ...params },
				})
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setEventDistribution(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a event distribution counts", async () => {
			mockApp.onGet(`dashboard/event-distribution`).reply(200, data);

			return expectSaga(sagas.fetchEventDistribution, { params })
				.dispatch(actions.fetchEventDistribution)
				.withReducer(dashboardReducer)
				.hasFinalState({
					apform: {
						data: {},
						isLoading: true,
					},
					eventAvailability: {
						data: [],
						months: [],
						isLoading: true,
					},
					events: {
						data: [],
						isLoading: true,
					},
					eventCounts: mocks.memberEventDistributionCounts,
					membersAvailability: {
						data: [],
						isLoading: true,
						months: [],
					},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch event counts distributions.";
			mockApp.onGet(`dashboard/event-distribution`).reply(404, { err });

			return expectSaga(sagas.fetchEventDistribution, { params })
				.dispatch(actions.fetchEventDistribution)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Today or Upcoming Events", () => {
		let data;
		let selectedEvent;
		beforeEach(() => {
			data = { events: mocks.eventsData };
			selectedEvent = "today";
		});

		it("logical flow matches pattern for fetch todays event requests", () => {
			const res = { data };

			testSaga(sagas.fetchEvents, { selectedEvent })
				.next()
				.call(app.get, `dashboard/events/${selectedEvent}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setEvents(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches todays event", async () => {
			mockApp.onGet(`dashboard/events/${selectedEvent}`).reply(200, data);

			return expectSaga(sagas.fetchEvents, { selectedEvent })
				.dispatch(actions.fetchEvents)
				.withReducer(dashboardReducer)
				.hasFinalState({
					apform: {
						data: {},
						isLoading: true,
					},
					eventAvailability: {
						data: [],
						months: [],
						isLoading: true,
					},
					events: {
						data: mocks.eventsData,
						isLoading: false,
					},
					eventCounts: [],
					membersAvailability: {
						data: [],
						isLoading: true,
						months: [],
					},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that AP form.";
			mockApp.onGet(`dashboard/events/${selectedEvent}`).reply(404, { err });

			return expectSaga(sagas.fetchEvents, { selectedEvent })
				.dispatch(actions.fetchEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});
});
