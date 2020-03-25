import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const Settings = () => (
	<AppLayout>
		<div>Settings</div>
	</AppLayout>
);

export default requiresBasicCredentials(Settings);
