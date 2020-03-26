import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const Schedule = () => (
	<AppLayout>
		<div>Schedule</div>
	</AppLayout>
);

export default requiresBasicCredentials(Schedule);
