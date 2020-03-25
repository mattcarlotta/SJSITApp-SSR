import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ScheduleEvent = () => (
	<AppLayout>
		<div>Schedule Event</div>
	</AppLayout>
);

export default requiresStaffCredentials(ScheduleEvent);
