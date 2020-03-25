import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const Settings = () => (
	<AppLayout>
		<div>Settings</div>
		<div css="height: 100vh" />
	</AppLayout>
);

export default requiresBasicCredentials(Settings);
