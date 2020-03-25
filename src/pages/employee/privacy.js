import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const Privacy = () => (
	<AppLayout>
		<div>Privacy</div>
	</AppLayout>
);

export default requiresBasicCredentials(Privacy);
