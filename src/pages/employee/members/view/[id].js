import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewMemberProfilePage = () => <div>View Member Profile Page</div>;

export default requiresStaffCredentials(ViewMemberProfilePage);
