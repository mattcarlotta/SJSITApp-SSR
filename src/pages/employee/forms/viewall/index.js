import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewForms = () => <div>View All Forms</div>;

export default requiresStaffCredentials(ViewForms);
