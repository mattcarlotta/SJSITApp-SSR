import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ViewAPForm = () => (
	<AppLayout>
		<div>View AP Form</div>
	</AppLayout>
);

export default requiresStaffCredentials(ViewAPForm);
