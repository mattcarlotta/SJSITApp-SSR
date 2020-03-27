import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ViewEvents = () => (
	<AppLayout>
		<div>View All Events</div>
	</AppLayout>
);

export default requiresStaffCredentials(ViewEvents);
