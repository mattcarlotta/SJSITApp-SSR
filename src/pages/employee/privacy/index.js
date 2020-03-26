import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";
import ViewPrivacy from "~containers/Body/ViewPrivacy";

const PrivacyPage = () => (
	<AppLayout>
		<ViewPrivacy />
	</AppLayout>
);

export default requiresBasicCredentials(PrivacyPage);
