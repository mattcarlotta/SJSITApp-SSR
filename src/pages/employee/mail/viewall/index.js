import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ViewMail = () => (
	<AppLayout>
		<div>View Mail</div>
	</AppLayout>
);

export default requiresStaffCredentials(ViewMail);
