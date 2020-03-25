import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const EditSeason = () => (
	<AppLayout>
		<div>Edit Season</div>
	</AppLayout>
);

export default requiresStaffCredentials(EditSeason);
