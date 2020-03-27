import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ViewMembers = () => (
	<AppLayout>
		<div>View Members</div>
	</AppLayout>
);

export default requiresStaffCredentials(ViewMembers);
