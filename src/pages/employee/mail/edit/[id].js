import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const EditMail = () => (
	<AppLayout>
		<div>Edit Mail</div>
	</AppLayout>
);

export default requiresStaffCredentials(EditMail);
