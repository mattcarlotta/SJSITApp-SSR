import { expectSaga, testSaga } from "redux-saga-test-plan";
import app from "~utils/axiosConfig";
import * as actions from "~actions/Dashboard";
import * as sagas from "~sagas/Dashboard";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import dashboardReducer from "~reducers/Dashboard";
import { parseData } from "~utils/parseResponse";

const months = [
	"2000-10-06T07:00:00.000+00:00",
	"2000-10-06T07:00:00.000+00:00",
];

describe("Dashboard Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Fetch AP Form", () => {
		let data;
		beforeEach(() => {
			data = mocks.formData;
		});

		it("logical flow matches pattern for a fetch A/P form request", () => {
			const res = { data };

			testSaga(sagas.fetchAPForm)
				.next()
				.call(app.get, "dashboard/ap-form")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setAPForm(res.data))
				.next()
				.isDone();
		});

		it("successfully retrieves the A/P form", async () => {
			mockApp.onGet("dashboard/ap-form").reply(200, { apform: data });

			return expectSaga(sagas.fetchAPForm)
				.dispatch(actions.fetchAPForm)
				.withReducer(dashboardReducer)
				.hasFinalState({
					apform: {
						data: mocks.formData,
						isLoading: false,
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
			const err = "Unable to retrieve A/P form.";
			mockApp.onGet("dashboard/ap-form").reply(404, { err });

			return expectSaga(sagas.fetchAPForm)
				.dispatch(actions.fetchAPForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Member Availability", () => {
		let data;
		beforeEach(() => {
			data = {
				eventAvailability: mocks.memberAvailabilityGraph,
				months,
			};
		});

		it("logical flow matches pattern for fetch member availability requests", () => {
			const res = { data };

			testSaga(sagas.fetchAvailability)
				.next()
				.call(app.get, "dashboard/availability")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setAvailability(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches member availability", async () => {
			mockApp.onGet("dashboard/availability").reply(200, data);

			return expectSaga(sagas.fetchAvailability)
				.dispatch(actions.fetchAvailability)
				.withReducer(dashboardReducer)
				.hasFinalState({
					apform: {
						data: {},
						isLoading: true,
					},
					eventAvailability: {
						data: mocks.memberAvailabilityGraph,
						months,
						isLoading: false,
					},
					events: {
						data: [],
						isLoading: true,
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
			const err = "Unable to fetch member availability.";
			mockApp.onGet("dashboard/availability").reply(404, { err });

			return expectSaga(sagas.fetchAvailability)
				.dispatch(actions.fetchAvailability)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
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
					show: true,
					type: "error",
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
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch All Members Availability", () => {
		let data;
		beforeEach(() => {
			data = { membersAvailability: mocks.membersAvailability, months };
		});

		it("logical flow matches pattern for members availability requests", () => {
			const res = { data };

			testSaga(sagas.fetchMembersAvailability)
				.next()
				.call(app.get, "dashboard/membersavailability")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setMembersAvailability(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches all members availability", async () => {
			mockApp.onGet("dashboard/membersavailability").reply(200, data);

			return expectSaga(sagas.fetchMembersAvailability)
				.dispatch(actions.fetchMembersAvailability)
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
					eventCounts: [],
					membersAvailability: {
						data: mocks.membersAvailability,
						isLoading: false,
						months,
					},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch members availability.";
			mockApp.onGet("dashboard/membersavailability").reply(404, { err });

			return expectSaga(sagas.fetchMembersAvailability)
				.dispatch(actions.fetchMembersAvailability)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});
});
