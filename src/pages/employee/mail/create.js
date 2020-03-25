import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const SendMail = () => (
	<AppLayout>
		<div>Send Mail</div>
	</AppLayout>
);

export default requiresStaffCredentials(SendMail);
