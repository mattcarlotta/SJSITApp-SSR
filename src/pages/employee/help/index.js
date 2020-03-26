import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";
import ViewHelp from "~containers/Body/ViewHelp";

const HelpPage = () => (
	<AppLayout>
		<ViewHelp />
	</AppLayout>
);

export default requiresBasicCredentials(HelpPage);
