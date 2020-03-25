import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const CreateMember = () => (
	<AppLayout>
		<div>Create Member</div>
	</AppLayout>
);

export default requiresStaffCredentials(CreateMember);
