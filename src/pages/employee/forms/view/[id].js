import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewAPForm = () => <div>View AP Form</div>;

export default requiresStaffCredentials(ViewAPForm);
