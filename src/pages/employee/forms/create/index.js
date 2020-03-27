import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const CreateForm = () => (
	<AppLayout>
		<div>New AP Form</div>
	</AppLayout>
);

export default requiresStaffCredentials(CreateForm);
