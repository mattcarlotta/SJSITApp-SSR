import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewLicensing from "~containers/Body/ViewLicense";

const LicensingPage = () => <ViewLicensing />;

export default requiresBasicCredentials(LicensingPage);
