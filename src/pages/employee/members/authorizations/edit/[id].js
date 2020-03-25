import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const EditAuthorizations = () => (
	<AppLayout>
		<div>Edit Authorizations</div>
	</AppLayout>
);

export default requiresStaffCredentials(EditAuthorizations);
