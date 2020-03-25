import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const EditForm = () => (
	<AppLayout>
		<div>Edit Form</div>
	</AppLayout>
);

export default requiresStaffCredentials(EditForm);
