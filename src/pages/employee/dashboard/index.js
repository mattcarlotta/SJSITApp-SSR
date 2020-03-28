import React from "react";
import moment from "moment-timezone";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewDashboard from "~containers/Body/ViewDashboard";
import { app } from "~utils";
import { parseCookie, parseData } from "~utils/parseResponse";
import * as actions from "~actions/Dashboard";
import dispatchError from "~utils/dispatchError";

const Dashboard = () => <ViewDashboard />;

Dashboard.getInitialProps = async ({ store: { dispatch, getState }, req }) => {
	const { role } = getState().auth;
	const headers = parseCookie(req);

	// fetch events
	try {
		const res = await app.get("dashboard/events/today", headers);
		const data = parseData(res);
		dispatch(actions.setEvents(data));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	// fetch AP form
	try {
		const res = await app.get("dashboard/ap-form", headers);
		const data = parseData(res);
		dispatch(actions.setAPForm(data));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	// fetch availability
	try {
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
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	// fetch event distribution chart
	try {
		const res = await app.get("dashboard/event-distribution", {
			...headers,
			params: {
				startDate: moment().startOf("month").format(),
				endDate: moment().endOf("month").format(),
			},
		});
		const data = parseData(res);
		dispatch(actions.setEventDistribution(data));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresBasicCredentials(Dashboard);
