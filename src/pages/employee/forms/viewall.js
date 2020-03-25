import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ViewForms = () => (
	<AppLayout>
		<div>View All Forms</div>
	</AppLayout>
);

export default requiresStaffCredentials(ViewForms);
