import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import AppLayout from "~components/App";

const ViewSeasons = () => (
	<AppLayout>
		<div>View All Seasons</div>
	</AppLayout>
);

export default requiresStaffCredentials(ViewSeasons);
