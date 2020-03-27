import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";
import ViewSchedule from "~containers/Body/ViewSchedule";
import { fetchScheduleEvents } from "~actions/Events";

const SchedulePage = () => (
	<AppLayout>
		<ViewSchedule />
	</AppLayout>
);

SchedulePage.getInitialProps = async ctx => {
	const {
		store: { dispatch },
		req,
	} = ctx;

	dispatch(fetchScheduleEvents({ req }));
};

export default requiresBasicCredentials(SchedulePage);
