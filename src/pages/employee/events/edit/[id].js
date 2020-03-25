import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const EditEvent = () => (
	<AppLayout>
		<div>Edit Event</div>
	</AppLayout>
);

export default requiresStaffCredentials(EditEvent);
