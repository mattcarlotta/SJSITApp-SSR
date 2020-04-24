import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewDashboard from "~containers/Body/ViewDashboard";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import moment from "~utils/momentWithTZ";
import * as actions from "~actions/Dashboard";

const Dashboard = () => <ViewDashboard />;

Dashboard.getInitialProps = async ({ store: { dispatch, getState }, req }) => {
	const { role } = getState().auth;
	const headers = parseCookie(req);

	dispatch(actions.resetDashboard());

	/**
	 * Attempts to get event for dashboard viewing.
	 *
	 * @function fetchEvents
	 * @param {string} eventId
	 * @yields {object} - A response from a call to the API.
	 * @function parseData - returns a parsed res.data.
	 * @function dispatch - Dispatches a redux action to set today/upcoming event data to redux state.
	 */
	const fetchEvents = async () => {
		const res = await app.get("dashboard/events/today", headers);
		const data = parseData(res);

		dispatch(actions.setEvents(data));
	};

	/**
	 * Attempts to get AP form for dashboard viewing.
	 *
	 * @function fetchAPForm
	 * @yields {object} - A response from a call to the API.
	 * @function parseData - returns a parsed res.data.
	 * @function dispatch - Dispatches a redux action to set AP form data to redux state.
	 */
	const fetchAPForm = async () => {
		const res = await app.get("dashboard/ap-form", headers);
		const data = parseData(res);

		dispatch(actions.setAPForm(data));
	};

	/**
	 * Attempts to get event availability for dashboard viewing.
	 *
	 * @function fetchAvailability
	 * @yields {object} - A response from a call to the API.
	 * @function parseData - Returns a parsed res.data.
	 * @function dispatch - Dispatches a redux action to set availabity data to redux state.
	 */
	const fetchAvailability = async () => {
		if (role !== "employee") {
			// all member availability
			const res = await app.get("dashboard/membersavailability", headers);
			const data = parseData(res);

			dispatch(actions.setMembersAvailability(data));
		} else {
			// signed in user availability
			const res = await app.get("dashboard/availability", headers);
			const data = parseData(res);

			dispatch(actions.setAvailability(data));
		}
	};

	/**
	 * Attempts to get event distribution for dashboard viewing.
	 *
	 * @function fetchEventDistribution
	 * @param {object} params - startDate and endDate
	 * @yields {object} - A response from a call to the API.
	 * @function parseData - returns a parsed res.data.
	 * @function dispatch - Dispatches a redux action to set event distribution data to redux state.
	 */
	const fetchEventDistribution = async () => {
		const res = await app.get("dashboard/event-distribution", {
			...headers,
			params: {
				startDate: moment().startOf("month").format(),
				endDate: moment().endOf("month").format(),
			},
		});
		const data = parseData(res);

		dispatch(actions.setEventDistribution(data));
	};

	const serverErrors = await Promise.all(
		[
			fetchEvents(),
			fetchAPForm(),
			fetchAvailability(),
			fetchEventDistribution(),
		].map(p => p.catch(e => e.toString())),
	);

	const serverError = [...new Set(serverErrors)].join("");

	return { serverError };
};

export default requiresBasicCredentials(Dashboard);
