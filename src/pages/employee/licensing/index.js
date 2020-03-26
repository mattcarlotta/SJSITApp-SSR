import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";
import ViewLicensing from "~containers/Body/ViewLicense";

const LicensingPage = () => (
	<AppLayout>
		<ViewLicensing />
	</AppLayout>
);

export default requiresBasicCredentials(LicensingPage);
