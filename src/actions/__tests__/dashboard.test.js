import * as types from "types";
import * as actions from "actions/Dashboard";

describe("Dashboard Actions", () => {
	it("returns DASHBOARD_FETCH_APFORM", () => {
		const value = actions.fetchAPForm();

		expect(value).toEqual({ type: types.DASHBOARD_FETCH_APFORM });
	});

	it("returns DASHBOARD_FETCH_AVAILABILITY", () => {
		const value = actions.fetchAvailability();

		expect(value).toEqual({ type: types.DASHBOARD_FETCH_AVAILABILITY });
	});

	it("returns DASHBOARD_FETCH_EVENT_DISTRIBUTION", () => {
		const params = {
			startDate: "2019-08-01T02:30:30.036+00:00",
			endDate: "2019-09-01T02:30:30.036+00:00",
		};
		const value = actions.fetchEventDistribution(params);

		expect(value).toEqual({
			type: types.DASHBOARD_FETCH_EVENT_DISTRIBUTION,
			params,
		});
	});

	it("returns DASHBOARD_FETCH_EVENTS", () => {
		const selectedEvent = "Today";
		const value = actions.fetchEvents(selectedEvent);

		expect(value).toEqual({
			type: types.DASHBOARD_FETCH_EVENTS,
			selectedEvent: selectedEvent.toLowerCase(),
		});
	});

	it("returns DASHBOARD_SET_APFORM with data", () => {
		const data = {
			_id: "0123456789",
			sendEmailNotificationsDate: "2019-08-01T02:30:30.036+00:00",
			startMonth: "2019-08-01T02:30:30.036+00:00",
			endMonth: "2019-09-01T02:30:30.036+00:00",
			expirationDate: "2019-08-15T02:30:30.036+00:00",
			notes: "",
			eventCounts: 1,
		};
		const value = actions.setAPForm(data);

		expect(value).toEqual({ type: types.DASHBOARD_SET_APFORM, payload: data });
	});

	it("returns DASHBOARD_SET_APFORM with empty data", () => {
		const value = actions.setAPForm();

		expect(value).toEqual({ type: types.DASHBOARD_SET_APFORM, payload: {} });
	});

	it("returns DASHBOARD_SET_AVAILABILITY with data", () => {
		const data = {
			_id: "0123456789",
			label: "available",
			value: 1,
		};
		const value = actions.setAvailability(data);

		expect(value).toEqual({
			type: types.DASHBOARD_SET_AVAILABILITY,
			payload: data,
		});
	});

	it("returns DASHBOARD_SET_AVAILABILITY with empty data", () => {
		const value = actions.setAvailability();

		expect(value).toEqual({
			type: types.DASHBOARD_SET_AVAILABILITY,
			payload: {},
		});
	});

	it("returns DASHBOARD_SET_EVENT_DISTRIBUTION with data", () => {
		const data = [
			{
				name: "Bob Dole",
				"Event Count": 1,
			},
		];
		const value = actions.setEventDistribution(data);

		expect(value).toEqual({
			type: types.DASHBOARD_SET_EVENT_DISTRIBUTION,
			payload: data,
		});
	});

	it("returns DASHBOARD_SET_EVENT_DISTRIBUTION with empty data", () => {
		const value = actions.setEventDistribution();

		expect(value).toEqual({
			type: types.DASHBOARD_SET_EVENT_DISTRIBUTION,
			payload: [],
		});
	});

	it("returns DASHBOARD_SET_EVENTS with data", () => {
		const data = [
			{
				_id: "0123456789",
				sendEmailNotificationsDate: "2019-08-01T02:30:30.036+00:00",
				startMonth: "2019-08-01T02:30:30.036+00:00",
				endMonth: "2019-09-01T02:30:30.036+00:00",
				expirationDate: "2019-08-15T02:30:30.036+00:00",
				notes: "",
			},
		];
		const value = actions.setEvents(data);

		expect(value).toEqual({
			type: types.DASHBOARD_SET_EVENTS,
			payload: data,
		});
	});

	it("returns DASHBOARD_SET_EVENTS with empty data", () => {
		const value = actions.setEvents();

		expect(value).toEqual({
			type: types.DASHBOARD_SET_EVENTS,
			payload: [],
		});
	});

	it("returns DASHBOARD_SET_MEMBERS_AVAILABILITY with data", () => {
		const data = [
			{
				eventCounts: 1,
				months: [
					"2019-08-01T02:30:30.036+00:00",
					"2019-09-01T02:30:30.036+00:00",
				],
				membersAvailability: [{ id: "Bob Dole", availability: 0 }],
			},
		];
		const value = actions.setMembersAvailability(data);

		expect(value).toEqual({
			type: types.DASHBOARD_SET_MEMBERS_AVAILABILITY,
			payload: data,
		});
	});

	it("returns DASHBOARD_SET_MEMBERS_AVAILABILITY with empty data", () => {
		const value = actions.setMembersAvailability();

		expect(value).toEqual({
			type: types.DASHBOARD_SET_MEMBERS_AVAILABILITY,
			payload: [],
		});
	});
});
