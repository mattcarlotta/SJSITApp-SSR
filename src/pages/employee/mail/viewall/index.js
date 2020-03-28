import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewMail = () => <div>View Mail</div>;

export default requiresStaffCredentials(ViewMail);
