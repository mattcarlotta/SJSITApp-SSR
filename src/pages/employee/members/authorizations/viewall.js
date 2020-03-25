import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ViewAuthorizations = () => (
	<AppLayout>
		<div>View Authorizations</div>
	</AppLayout>
);

export default requiresStaffCredentials(ViewAuthorizations);
