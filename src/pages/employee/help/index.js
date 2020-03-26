import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const Help = () => (
	<AppLayout>
		<div>Help</div>
	</AppLayout>
);

export default requiresBasicCredentials(Help);
