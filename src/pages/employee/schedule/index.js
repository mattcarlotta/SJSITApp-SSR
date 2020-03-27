import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";
import ViewSchedule from "~containers/Body/ViewSchedule";
import { app } from "~utils";
import { setScheduleEvents } from "~actions/Events";
import { parseCookie, parseData } from "~utils/parseResponse";
import dispatchError from "~utils/dispatchError";

const SchedulePage = () => (
	<AppLayout>
		<ViewSchedule />
	</AppLayout>
);

SchedulePage.getInitialProps = async ({ store: { dispatch }, req }) => {
	try {
		const res = await app.get("events/schedule", parseCookie(req));
		const data = parseData(res);

		dispatch(setScheduleEvents(data));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresBasicCredentials(SchedulePage);
