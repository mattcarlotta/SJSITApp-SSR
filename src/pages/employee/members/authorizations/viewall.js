import React from "react";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";

const ViewAuthorizations = () => <div>View Authorizations</div>;

export default requiresStaffCredentials(ViewAuthorizations);
