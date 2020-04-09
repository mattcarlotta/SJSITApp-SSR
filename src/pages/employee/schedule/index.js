import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewSchedule from "~containers/Body/ViewSchedule";
import app from "~utils/axiosConfig";
import { setScheduleEvents } from "~actions/Events";
import { parseCookie, parseData } from "~utils/parseResponse";

const SchedulePage = () => <ViewSchedule />;

SchedulePage.getInitialProps = async ({ store: { dispatch }, req }) => {
	try {
		const res = await app.get("events/schedule", parseCookie(req));
		const data = parseData(res);

		dispatch(setScheduleEvents(data));
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresBasicCredentials(SchedulePage);
