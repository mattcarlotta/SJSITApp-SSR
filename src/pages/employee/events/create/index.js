import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const CreateEvent = () => (
	<AppLayout>
		<div>Create Event</div>
	</AppLayout>
);

export default requiresStaffCredentials(CreateEvent);
