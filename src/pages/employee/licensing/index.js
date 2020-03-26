import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const Licensing = () => (
	<AppLayout>
		<div>Licensing</div>
	</AppLayout>
);

export default requiresBasicCredentials(Licensing);
