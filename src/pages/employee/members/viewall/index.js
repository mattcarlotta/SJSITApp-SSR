import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewMembers = () => <div>View Members</div>;

export default requiresStaffCredentials(ViewMembers);
