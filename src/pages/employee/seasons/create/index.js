import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const CreateSeason = () => (
	<AppLayout>
		<div>Create Season</div>
	</AppLayout>
);

export default requiresStaffCredentials(CreateSeason);
